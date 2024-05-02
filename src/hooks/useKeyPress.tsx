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
