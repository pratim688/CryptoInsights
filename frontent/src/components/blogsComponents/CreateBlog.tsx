import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { editorStyles } from "../../utils/EditorStyle";
import { BlogFormData, FormValidation } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateBlog: React.FC = () => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    banner: "",
    description: "",
    previewImage: "",
  });
  // Add validation state
  const [validation, setValidation] = useState<FormValidation>({
    title: true,
    description: true,
    banner: true,
    content: true,
  });
  const [tags, setTags] = useState<string[]>([]);
  const predefinedTags = [
    "Latest",
    "Press-release",
    "Coins",
    "Wallets",
    "Blockchain",
  ];
  const navigate = useNavigate();

  // Updated handler with proper typing
  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, previewImage: previewUrl }));

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/blog/uploadFile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          banner: response.data.file.url,
        }));
        console.log(response.data.message || "Image uploaded successfully");
      }
    } catch (error: any) {
      console.error(error.response?.data?.message || "Failed to upload image");
    }
  };

  // Add validation helper function
  const validateForm = async (): Promise<boolean> => {
    if (!editorInstance.current) return false;

    const content = await editorInstance.current.save();
    const hasContent = content.blocks.length > 0;

    const newValidation = {
      title: formData.title.length >= 3,
      description:
        formData.description.length >= 10 && formData.description.length <= 300,
      banner: !!formData.banner,
      content: hasContent,
    };

    setValidation(newValidation);
    return Object.values(newValidation).every(Boolean);
  };

  // Updated save handler with error handling
  const handleSave = async () => {
    try {
      const isValid = await validateForm();

      if (!isValid) {
        console.error("Please fill all required fields correctly");
        return;
      }
      if (!editorInstance.current) return;

      const savedContent: OutputData = await editorInstance.current.save();
      const blogData = {
        ...formData,
        content: savedContent,
        tags,
      };
      console.log(blogData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/blog/createblog`,
        blogData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Only reset form and editor on successful save
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log(response.data.message || "Blog created successfully");

        // Reset form and editor
        setFormData({
          title: "",
          banner: "",
          description: "",
          previewImage: "",
        });
        editorInstance.current.clear();
        setTimeout(() => {
          navigate("/blogs");
        });
      }
    } catch (error: any) {
      console.error(
        error.response?.data?.message + " Please Login" || "Failed to save blog"
      );
    }
  };

  useEffect(() => {
    // Add styles to document head
    const styleElement = document.createElement("style");
    styleElement.innerHTML = editorStyles;
    document.head.appendChild(styleElement);

    // Initialize Editor.js
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            placeholder: "Heading",
          },
        },
        list: {
          class: List as unknown as ToolConstructable,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${import.meta.env.VITE_API_URL}/v1/blog/uploadFile`, // Your backend file uploader endpoint
              //byUrl: 'http://localhost:3000/fetchUrl', // Your endpoint that provides uploading by URL
            },
          },
        },
      },
      placeholder: "Tell your story...",
      autofocus: true,
    });

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy;
        editorInstance.current = null;
      }
      // Clean up styles
      styleElement.remove();
    };
  }, []);

  return (
    <>
      <section className="md:pt-20 lg:py-10">
        <div className="container max-w-3xl mx-auto mb-20 flex flex-col justify-between gap-5  px-8 py-6 bg-slate-30 rounded-xl">
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none ${
                  !validation.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter a captivating title..."
              />
              {!validation.title && (
                <p className="text-red-500 text-sm mt-1">
                  Title must be at least 3 characters
                </p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Banner Image
              </label>
              {!formData.previewImage ? (
                // Show upload form when no image
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-200">
                  <input
                    id="banner"
                    type="file"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="banner"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click to upload banner image
                    </span>
                  </label>
                </div>
              ) : (
                // Show preview when image exists
                <div className="relative">
                  <img
                    src={formData.previewImage}
                    alt="Banner"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        previewImage: "",
                        banner: "",
                      }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {!validation.banner && (
                <p className="text-red-500 text-sm mt-1">
                  Banner image is required
                </p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                placeholder="Write a brief description of your story..."
                rows={4}
              ></textarea>
              {!validation.description && (
                <p className="text-red-500 text-sm mt-1">
                  Description must be between 10 and 300 characters
                </p>
              )}
              <div
                className={`text-xs mt-1 text-right ${
                  formData.description.length > 300
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {formData.description.length}/300 characters
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Content
              </label>
              <br />
              <div
                id="editorjs"
                className="border border-gray-300 bg-white rounded-lg shadow-sm min-h-[400px] prose max-w-none
                        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
                        transition-all duration-200 px-20 py-10"
              >
                {/* EditorJS will render here */}
              </div>
              {!validation.content && (
                <p className="text-red-500 text-sm mt-1">
                  Content cannot be empty
                </p>
              )}
              <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Select text for formatting</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Drag images to upload</span>
                </div>
              </div>
            </div>
            <div className="relative flex gap-6 ">
              <label className="text-sm font-semibold text-gray-700 mb-2 block mt-1">
                Tags:
              </label>
              <Select onValueChange={(value) => setTags((prevTags) => [...prevTags, value.trim().toLowerCase()])}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 
                       transform hover:scale-105 transition-all duration-200 flex items-center space-x-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                <span>Publish Story</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CreateBlog;
