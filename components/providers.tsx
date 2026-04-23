"use client";

import { type ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(222 40% 10%)",
            border: "1px solid hsl(222 30% 18%)",
            color: "white",
          },
        }}
      />
    </>
  );
}
