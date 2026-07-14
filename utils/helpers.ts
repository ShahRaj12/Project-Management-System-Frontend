import { ApiErrorResponse } from "@/types/api";

export const parseApiError = (error: any): ApiErrorResponse => {
  const defaultError: ApiErrorResponse = {
    message: "Something went wrong. Please try again later.",
    status: 500,
  };

  if (!error) return defaultError;

  if (error.response) {
    return {
      message: error.response.data?.message || defaultError.message,
      errors: error.response.data?.errors,
      status: error.response.status,
    };
  }

  if (error.request) {
    return {
      message: "Unable to connect to the server. Please check your network.",
      status: 0,
    };
  }

  return {
    message: error.message || defaultError.message,
    status: 500,
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const downloadFile = (data: BlobPart, filename: string, mimeType = "text/plain") => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
