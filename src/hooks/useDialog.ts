import { inject } from "vue";
import { DialogItem, injectDialogs, singleDialogKey } from "../plugin/programmatic-dialogs";

export function useDialog() {
  const dialog = inject<DialogItem>(singleDialogKey)!;
  const dialogs = injectDialogs();
  if (!dialogs) throw Error("Programmatic dialogs plugin must be registered!");
  if (dialog == undefined)
    throw Error("useDialog can only be invoked from a Dialog injection component!");

  function close() {
    const index = dialogs.store.dialogs.findIndex((d) => d.id === dialog.id);
    dialogs.store.removedDialogs.push(dialogs.store.dialogs.splice(index, 1)[0]);
  }

  function isCloseOnCancel() {
    return !(
      (dialogs.options.closeOnCancel === false &&
        (dialog.closeOnCancel === false || dialog.closeOnCancel == undefined)) ||
      dialog.closeOnCancel === false
    );
  }
  function isCloseOnConfirm() {
    return !(
      (dialogs.options.closeOnConfirm === false &&
        (dialog.closeOnConfirm === false || dialog.closeOnConfirm == undefined)) ||
      dialog.closeOnConfirm === false
    );
  }

  return {
    id: dialog.id,
    updateProps: (props: Record<string, any>) => {
      dialog.props = { ...dialog.props, ...props };
    },
    close,
    cancel: () => {
      dialog.onCancelled?.(dialog);
      if (dialog.closeOnCancel === false) return;
      if (isCloseOnCancel()) close();
    },
    confirm: () => {
      dialog.onConfirmed?.(dialog);
      if (isCloseOnConfirm()) close();
    },
  };
}
