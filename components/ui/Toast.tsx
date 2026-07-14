"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  description: string;
  duration?: number;
}

interface ToastContextType {
  toast: (message: Omit<ToastMessage, "id">) => void;
  success: (description: string, title?: string) => void;
  error: (description: string, title?: string) => void;
  info: (description: string, title?: string) => void;
  warning: (description: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (t: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = t.duration ?? 4000;
    
    setToasts((prev) => [...prev, { ...t, id }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (description: string, title?: string) => addToast({ type: "success", description, title });
  const error = (description: string, title?: string) => addToast({ type: "error", description, title });
  const info = (description: string, title?: string) => addToast({ type: "info", description, title });
  const warning = (description: string, title?: string) => addToast({ type: "warning", description, title });

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  };

  const bgStyles = {
    success: "bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 shadow-lg text-gray-900 dark:text-gray-100",
    error: "bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 shadow-lg text-gray-900 dark:text-gray-100",
    info: "bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 shadow-lg text-gray-900 dark:text-gray-100",
    warning: "bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-800 shadow-lg text-gray-900 dark:text-gray-100",
  };

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className={`flex gap-3 p-4 rounded-xl border ${bgStyles[t.type]} items-start`}
            >
              <div className="flex-shrink-0 mt-0.5">{icons[t.type]}</div>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                {t.title && <h5 className="font-semibold text-sm leading-snug">{t.title}</h5>}
                <p className="text-xs text-gray-500 dark:text-gray-400 break-words">{t.description}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-0.5 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
export default ToastProvider;
