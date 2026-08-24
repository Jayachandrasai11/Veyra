import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";

export function Providers({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
