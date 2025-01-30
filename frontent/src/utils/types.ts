import EditorJS from "@editorjs/editorjs";
// src/types.ts
export interface Author {
  _id: string;
  email: string;
  role: string;
}
export interface BlogPost {
  _id: string;
  blog_id:string;
  title: string;
  des: string;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
  authorImageUrl: string;
  date: string;
  readTime: string;
  banner: string;
  createdAt: string;
  activity?: {
    total_reads?: number;
    total_comments?: number;
  };
}

export interface Block {
  id: string;
  type: string;
  data?: {
    text?: string;
    items?: string[];
    style?: string;
    caption?: string;
    file?: {
      url?: string;
    };
  };
  text?: string;
  items?: string[];

  emphasis?: string;
}

export interface EditorJsContent {
  time: number;
  blocks: Block[];
  version: string;
}

export interface FormData {
  name: string;
  about: EditorJsContent[];
  faqs: EditorJsContent[];
  socials: {
    facebook?: string;
    twitter?: string;
    officialPage?: string;
  };
  tradable: boolean;
  creator: string;
}

export interface EditorProps {
  id: string;
  label: string;
  error?: string;
  placeholder: string;
  editorInstance: EditorJS | null;
}

export interface SocialInputProps {
  name: keyof FormData["socials"];
  value: string;
  icon: React.ReactNode;
  label: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface BlogFormData {
  title: string;
  banner: string;
  description: string;
  previewImage?: string;
  editorData?: {
    time: number;
    blocks: any[];
    version: string;
  };
  tags?:any[]
}

export interface FormValidation {
  title: boolean;
  description: boolean;
  banner: boolean;
  content: boolean;
}

//Types of blogInfo page
export interface Activity {
  total_likes?: number;
  total_comments?: number;
  total_shares?: number;
}

export interface Blog {
  title?: string;
  des?: string;
  createdAt?: string;
  banner?: string;
  activity?: Activity;
  content?: Array<{ blocks: Block[] }>;
  author?: {
    name?: string;
    profilePicture?: string;
  };
  readTime?: string;
  likedByDevices?: string[]; // Add this field for the list of devices that liked the blog
  likedOrNot: boolean;
}

//types of write blog

export interface BlogFormData {
  title: string;
  banner: string;
  description: string;
  previewImage?: string;
}
// Add validation interface
export interface FormValidation {
  title: boolean;
  description: boolean;
  banner: boolean;
  content: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role:string;
  blogHistory:any[];
  image:string;
}
