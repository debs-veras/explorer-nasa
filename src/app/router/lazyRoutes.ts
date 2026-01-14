import { lazy } from "react";

export const lazyRoutes = {
  ApodGalleryPage: lazy(() => import("../../domains/apod/pages/ApodGalleryPage")),
};
