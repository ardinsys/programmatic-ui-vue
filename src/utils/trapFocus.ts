export interface FocusTrap {
  release: () => void;
}

export function trapFocus(element: HTMLElement): FocusTrap {
  const prevFocusedElement = document.activeElement as HTMLElement | null;
  element.focus();

  const focusableElements = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex="0"]'
  ) as NodeListOf<HTMLElement>;

  const firstFocusableElement = focusableElements?.[0];
  const lastFocusableElement = focusableElements?.[focusableElements.length - 1];

  const listener = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (firstFocusableElement == undefined || lastFocusableElement == undefined) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener("keydown", listener);

  return {
    release: (restoreFocus = true) => {
      element.removeEventListener("keydown", listener);
      if (restoreFocus) prevFocusedElement?.focus();
    },
  };
}
