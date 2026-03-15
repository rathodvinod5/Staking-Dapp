"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  type?: "foreground" | "background";
  duration?: number;
};

type ToastContextType = {
  toast: (props: Omit<ToastProps, "id">) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0 flex-col-reverse justify-end",
  "bottom-center":
    "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse justify-end",
  "bottom-right": "bottom-0 right-0 flex-col-reverse justify-end",
};

export function ToastProvider({
  children,
  position = "top-center",
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: Omit<ToastProps, "id">) => {
    setToasts((prev) => [
      ...prev,
      { ...props, id: Math.random().toString(36).substring(2, 9) },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitives.Provider swipeDirection="right">
        {children}

        {toasts.map((t) => (
          <ToastPrimitives.Root
            key={t.id}
            duration={t.duration || 5000}
            onOpenChange={(open) => {
              if (!open) {
                setToasts((prev) => prev.filter((item) => item.id !== t.id));
              }
            }}
            className="bg-zinc-900 border border-zinc-800 text-white p-4 rounded-lg shadow-lg grid gap-1 relative overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-4 data-[state=closed]:slide-out-to-top-4"
          >
            {t.title && (
              <ToastPrimitives.Title className="font-medium text-sm">
                {t.title}
              </ToastPrimitives.Title>
            )}
            {t.description && (
              <ToastPrimitives.Description className="text-zinc-400 text-sm">
                {t.description}
              </ToastPrimitives.Description>
            )}
            <ToastPrimitives.Close className="absolute right-2 top-2 text-zinc-500 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </ToastPrimitives.Close>
          </ToastPrimitives.Root>
        ))}

        <ToastPrimitives.Viewport
          className={`fixed z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[420px] ${positionClasses[position]}`}
        />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
