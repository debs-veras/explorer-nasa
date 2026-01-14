import { Suspense } from "react";
import { AppRouter } from "./app/router";
import Loading from "./shared/components/Loading";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AppRouter />
    </Suspense>
  );
}
