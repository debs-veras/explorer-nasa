import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { lazyRoutes } from "./lazyRoutes";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <lazyRoutes.ApodGalleryPage />,
      },
    ],
  },
]);
