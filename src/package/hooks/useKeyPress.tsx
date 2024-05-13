import { useEffect } from "react";

export function useKeyPress(targetKey: string, handler: () => void) {
  useEffect(() => {
    const match = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler();
      }
    };

    window.addEventListener("keydown", match);

    return () => {
      window.removeEventListener("keydown", match);
    };
  }, [targetKey, handler]);
}

export function useCtrlS(handler: () => void) {
  useEffect(() => {
    const match = (event: KeyboardEvent) => {
      if (event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", match);

    return () => {
      window.removeEventListener("keydown", match);
    };
  }, [handler]);
}
