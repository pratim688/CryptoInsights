import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/RouteSecure/ProtectedRoute"; // Adjust the path to your component
import Layout from "./components/Layout";
import AllBlog from "./components/blogsComponents/AllBlog";
import SignInPage from "./components/auth/SignInPage";
import SignOutPage from "./components/auth/SignOutPage";
import SignUpPage from "./components/auth/SignUpPage";
import WriteBlog from "./pages/BlogWrite";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogByCategory from "./components/blogsComponents/BlogByCategory";
import SingleBlog from "./components/blogsComponents/SingleBlog";
import CreateBlog from "./components/blogsComponents/CreateBlog";
import EditBlog from "./components/Dashboard/Components/EditBlog";
import ViewUserBlogs from "./components/Dashboard/Components/ViewUserBlogs";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AllBlog />} />
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/signout" element={<SignOutPage />} />
            <Route path="/blogs" element={<AllBlog />} />
            <Route path="/blogs/category/:category" element={<BlogByCategory />} />
            <Route path="/blog/:blog_id" element={<SingleBlog />} />

            {/* Protected Routes */}
            <Route
              path="/user/create-blog"
              element={
                <ProtectedRoute>
                  <WriteBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="create" element={<CreateBlog />} />
              <Route path="blogs" element={<ViewUserBlogs />} />
              <Route path="editblog/:id" element={<EditBlog />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
