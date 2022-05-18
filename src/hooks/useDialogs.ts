import { inject } from "vue";
import {
  DialogInjectionData,
  DialogItem,
  dialogKey,
  DialogOptions,
} from "../plugin/programmatic-dialogs";

export function useDialogs() {
  const dialogs = inject<DialogInjectionData>(dialogKey)!;
  if (!dialogs) throw Error("Programmatic dialogs plugin must be registered!");

  return {
    show(options?: DialogOptions) {
      const defaultOptions = { ...dialogs.options };
      delete defaultOptions.onClose;
      delete defaultOptions.onClosed;
      delete defaultOptions.onOpen;
      delete defaultOptions.onOpened;
      const mergedOptions: DialogItem = {
        ...defaultOptions,
        ...options,
        id: String(Math.random()).replace(".", ""),
      };
      dialogs.store.dialogs.push(mergedOptions);
      const dialog = dialogs.store.dialogs[dialogs.store.dialogs.length - 1];

      return {
        close: () => {
          const index = dialogs.store.dialogs.indexOf(mergedOptions);
          if (index === -1) return;
          dialogs.store.dialogs.splice(index, 1);
        },
        updateProps: (props: Record<string, any>) => {
          dialog.props = { ...dialog.props, ...props };
        },
      };
    },
  };
}
