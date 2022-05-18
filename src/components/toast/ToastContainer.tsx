import { defineComponent, inject, TransitionGroup } from "vue";
import {
  ToastALignment,
  ToastInjectionData,
  toastKey,
  ToastItem,
} from "../../plugin/programmatic-toasts";
import { Toast } from "./Toast";
import styles from "./ToastContainer.module.css";

export const ToastContainer = defineComponent({
  name: "ToastContainer",

  setup() {
    const toasts = inject<ToastInjectionData>(toastKey)!;

    function getToastComponent(opt: ToastItem) {
      return toasts.options.componentDefinitions
        ? toasts.options.componentDefinitions[opt.type || ""] || toasts.options.component
        : toasts.options.component;
    }

    function getToastsBasedOnPosition(position: ToastALignment) {
      return toasts.store.toasts.filter((toast) => {
        const pos = toast.position || toasts.options.position || "bottom-right";
        return pos === position;
      });
    }

    const positions: ToastALignment[] = [
      "bottom-center",
      "bottom-left",
      "bottom-right",
      "center",
      "top-center",
      "top-left",
      "top-right",
    ];

    function onOpen(element: Element) {
      const toast = getToastFromElement(element);
      if (toasts.options.onOpen) toasts.options.onOpen(toast);
      if (toast.onOpen) toast.onOpen(toast);
    }

    function onOpened(element: Element) {
      const toast = getToastFromElement(element);
      if (toasts.options.onOpened) toasts.options.onOpened(toast);
      if (toast.onOpened) toast.onOpened(toast);
    }

    function onClose(element: Element) {
      const toast = getToastFromElement(element);
      if (toasts.options.onClose) toasts.options.onClose(toast);
      if (toast.onClose) toast.onClose(toast);
    }

    function onClosed(element: Element) {
      const toast = getToastFromElement(element);
      const index = toasts.store.toasts.indexOf(toast);
      if (index !== -1) {
        toasts.store.toasts.splice(index, 1);
      } else {
        const autoIndex = toasts.store.autoRemovedToasts.indexOf(toast);
        if (autoIndex !== -1) {
          toasts.store.autoRemovedToasts.splice(autoIndex, 1);
        }
      }
      if (toasts.options.onClosed) toasts.options.onClosed(toast);
      if (toast.onClosed) toast.onClosed(toast);
    }

    function getToastFromElement(element: Element) {
      const id = element.getAttribute("id")!;
      let toast = toasts.store.toasts.find((toast) => toast.id === id);
      if (!toast) toast = toasts.store.autoRemovedToasts.find((toast) => toast.id === id)!;
      return toast;
    }

    function autoClose(toast: ToastItem) {
      const removed = toasts.store.toasts.splice(toasts.store.toasts.indexOf(toast), 1);
      if (removed.length) {
        toasts.store.autoRemovedToasts.push(removed[0]);
      }
    }

    return () => (
      <div>
        {positions.map((pos) => (
          <div key={pos} class={styles[`toast-container-${pos}`]}>
            <TransitionGroup
              tag="div"
              name={toasts.options.groupAnimationName || "toast-fade"}
              onEnter={onOpen}
              onAfterEnter={onOpened}
              onLeave={onClose}
              onAfterLeave={onClosed}
            >
              {getToastsBasedOnPosition(pos).map((toast) => (
                <div key={toast.id} id={toast.id} class={styles["toast-group-item"]}>
                  <Toast
                    id={toast.id}
                    component={getToastComponent(toast)}
                    autoClose={toast.autoClose}
                    autoCloseTimeout={toast.autoCloseTimeout}
                    injectionProps={toast.props}
                    onAutoClose={() => autoClose(toast)}
                  />
                </div>
              ))}
            </TransitionGroup>
          </div>
        ))}
      </div>
    );
  },
});
