"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </TooltipProvider>
    </Provider>
  );
}
