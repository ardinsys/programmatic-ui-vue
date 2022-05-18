import { inject } from "vue";
import {
  ToastInjectionData,
  ToastItem,
  toastKey,
  ToastOptions,
} from "../plugin/programmatic-toasts";

export function useToasts() {
  const toasts = inject<ToastInjectionData>(toastKey)!;
  if (!toasts) throw Error("Programmatic toasts plugin must be registered!");

  return {
    show(options?: ToastOptions) {
      const defaultOptions = { ...toasts.options };
      delete defaultOptions.onClose;
      delete defaultOptions.onClosed;
      delete defaultOptions.onOpen;
      delete defaultOptions.onOpened;
      const mergedOptions: ToastItem = {
        ...defaultOptions,
        ...options,
        id: String(Math.random()).replace(".", ""),
      };
      toasts.store.toasts.push(mergedOptions);
      const toast = toasts.store.toasts[toasts.store.toasts.length - 1];

      return {
        close: () => {
          const index = toasts.store.toasts.indexOf(mergedOptions);
          if (index === -1) return;
          toasts.store.autoRemovedToasts.push(toasts.store.toasts.splice(index, 1)[0]);
        },
        updateProps: (props: Record<string, any>) => {
          toast.props = { ...toast.props, ...props };
        },
      };
    },
  };
}
