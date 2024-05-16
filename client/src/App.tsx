import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Authors from "./pages/Authors.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import AuthorPosts from "./pages/AuthorPosts.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import CategoryPosts from "./pages/CategoryPosts.tsx";
import EditPost from "./pages/EditPost.tsx";
import Logout from "./pages/Logout.tsx";
import DeletePost from "./pages/DeletePost.tsx";
// @ts-ignore
import UserProvider from "./context/userContext.js";
import { REACT_BASE_URI } from "../constants/constants.ts";

function App() {
  // @ts-ignore
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserProvider>
          <Layout />
        </UserProvider>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "posts/:id", element: <PostDetail /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "profile/:id", element: <UserProfile /> },
        { path: "authors", element: <Authors /> },
        { path: "posts/users/:id", element: <AuthorPosts /> },
        {
          path: "myposts/:id",
          element: <Dashboard />,
          loader: async ({ params }) => {
            return fetch(`${REACT_BASE_URI}/${params.title}.json`);
          },
        },
        { path: "posts/categories/:category", element: <CategoryPosts /> },
        { path: "posts/:id/edit", element: <EditPost /> },
        { path: "posts/:id/delete", element: <DeletePost /> },
        { path: "logout", element: <Logout /> },
        { path: "create", element: <CreatePost /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
