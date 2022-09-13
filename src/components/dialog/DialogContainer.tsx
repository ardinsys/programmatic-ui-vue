import { defineComponent, inject, TransitionGroup, watch } from "vue";
import { DialogInjectionData, DialogItem, dialogKey } from "../../plugin/programmatic-dialogs";
import { Dialog } from "./Dialog";

export const DialogContainer = defineComponent({
  name: "DialogContainer",

  setup() {
    const dialogs = inject<DialogInjectionData>(dialogKey)!;

    function getDialogComponent(opt: DialogItem) {
      return dialogs.options.componentDefinitions
        ? dialogs.options.componentDefinitions[opt.type || ""] || dialogs.options.component
        : dialogs.options.component;
    }

    function onOpen(element: Element) {
      const dialog = getDialogFromElement(element);
      if (!dialog) return;
      if (dialogs.options.onOpen) dialogs.options.onOpen(dialog);
      if (dialog.onOpen) dialog.onOpen(dialog);
    }

    function onOpened(element: Element) {
      const dialog = getDialogFromElement(element);
      if (!dialog) return;
      if (dialogs.options.onOpened) dialogs.options.onOpened(dialog);
      if (dialog.onOpened) dialog.onOpened(dialog);
    }

    function onClose(element: Element) {
      const dialog = getDialogFromElement(element);
      if (!dialog) return;
      if (dialogs.options.onClose) dialogs.options.onClose(dialog);
      if (dialog.onClose) dialog.onClose(dialog);
    }

    function onClosed(element: Element) {
      const dialog = getDialogFromElement(element);
      if (!dialog) return;
      const index = dialogs.store.dialogs.indexOf(dialog);
      if (index !== -1) {
        dialogs.store.dialogs.splice(index, 1);
      } else {
        const index = dialogs.store.removedDialogs.indexOf(dialog);
        if (index !== -1) {
          dialogs.store.removedDialogs.splice(index, 1);
        }
      }
      if (dialogs.options.onClosed) dialogs.options.onClosed(dialog);
      if (dialog.onClosed) dialog.onClosed(dialog);
    }

    function getDialogFromElement(element: Element) {
      const id = element.getAttribute("id")!;
      return (
        dialogs.store.dialogs.find((dialog) => dialog.id === id) ||
        dialogs.store.removedDialogs.find((dialog) => dialog.id === id)
      );
    }

    watch(
      () => dialogs.store.dialogs.length,
      (length) => {
        if (length) document.body.classList.add("dialog-util-overflow-hidden");
        else document.body.classList.remove("dialog-util-overflow-hidden");
      }
    );

    function isCloseOnEsc(dialog: DialogItem) {
      return !(
        (dialogs.options.closeOnEsc === false &&
          (dialog.closeOnEsc === false || dialog.closeOnEsc == undefined)) ||
        dialog.closeOnEsc === false
      );
    }

    function isCloseOnBackdropClick(dialog: DialogItem) {
      return !(
        (dialogs.options.closeOnBackdropClick === false &&
          (dialog.closeOnBackdropClick === false || dialog.closeOnBackdropClick == undefined)) ||
        dialog.closeOnBackdropClick === false
      );
    }

    function getBacdropColor(dialog: DialogItem) {
      return (
        dialog.backdropColor ||
        dialogs.options.backdropColor ||
        "var(--dialog-backdrop-color, rgba(0, 0, 0, 0.4))"
      );
    }

    function getAccessibilityAttrs(dialog: DialogItem) {
      if (dialogs.options.aria && dialog.aria) {
        return { ...dialogs.options.aria, ...dialog.aria };
      } else if (dialogs.options.aria) {
        return dialogs.options.aria;
      } else if (dialog.aria) {
        return dialog.aria;
      }
      return {};
    }

    return () => (
      <div style="z-index: 10000">
        <TransitionGroup
          name={dialogs.options.animationName || "dialog-fade"}
          onEnter={onOpen}
          onAfterEnter={onOpened}
          onLeave={onClose}
          onAfterLeave={onClosed}
        >
          {dialogs.store.dialogs.map((dialog, i) => {
            return (
              <Dialog
                id={dialog.id}
                key={dialog.id}
                dialog={dialog}
                component={getDialogComponent(dialog)}
                closeOnEsc={isCloseOnEsc(dialog)}
                closeOnBackdropClick={isCloseOnBackdropClick(dialog)}
                backdropColor={getBacdropColor(dialog)}
                aria={getAccessibilityAttrs(dialog)}
                onClose={() =>
                  dialogs.store.removedDialogs.push(dialogs.store.dialogs.splice(i, 1)[0])
                }
              />
            );
          })}
        </TransitionGroup>
      </div>
    );
  },
});
