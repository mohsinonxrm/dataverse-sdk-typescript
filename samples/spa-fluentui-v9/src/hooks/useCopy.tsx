import { useCallback } from "react";
import { Toast, ToastTitle, useToastController } from "@fluentui/react-components";
import { TOASTER_ID } from "../components/toaster";

/**
 * Copies text to the clipboard and says so in a toast (or that the browser didn't allow it).
 * Resolves to whether the text was copied.
 */
export function useCopy(): (text: string, done?: string) => Promise<boolean> {
  const { dispatchToast } = useToastController(TOASTER_ID);
  return useCallback(
    async (text: string, done = "Copied to the clipboard") => {
      try {
        await navigator.clipboard.writeText(text);
        dispatchToast(
          <Toast>
            <ToastTitle>{done}</ToastTitle>
          </Toast>,
          { intent: "success", timeout: 2000 }
        );
        return true;
      } catch {
        dispatchToast(
          <Toast>
            <ToastTitle>The browser didn&apos;t allow copying</ToastTitle>
          </Toast>,
          { intent: "warning" }
        );
        return false;
      }
    },
    [dispatchToast]
  );
}
