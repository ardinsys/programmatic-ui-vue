import { inject } from "vue";
import { singleToastKey, injectToasts } from "../plugin/programmatic-toasts";

export function useToast() {
  const toastId = inject<string>(singleToastKey)!;
  const toasts = injectToasts();
  if (!toasts) throw Error("Programmatic toasts plugin must be registered!");
  if (toastId == undefined)
    throw Error("useToast can only be invoked from a Toast injection component!");

  const toast = toasts.store.toasts.find((toast) => toast.id === toastId)!;

  return {
    updateProps: (props: Record<string, any>) => {
      toast.props = { ...toast.props, ...props };
    },
    close: () => {
      const index = toasts.store.toasts.findIndex((toast) => toast.id === toastId);
      toasts.store.autoRemovedToasts.push(toasts.store.toasts.splice(index, 1)[0]);
    },
  };
}
