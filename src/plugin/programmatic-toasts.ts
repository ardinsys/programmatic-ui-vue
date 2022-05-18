import { DefineComponent, Plugin, reactive } from "vue";

export type ToastALignment =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "center";

export interface ToastOptions {
  /**
   * Whether the toast should close after a certain timeout or not.
   * Defaults to true.
   */
  autoClose?: boolean;
  /**
   * Defines the time that autoClose will use in milliseconds. Has no effect if autoClose is disabled.
   */
  autoCloseTimeout?: number;
  /**
   * Defines the position of the toast.
   */
  position?: ToastALignment;
  /**
   * These props will be passed down to your component.
   * If props were defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your toast. Will be used when determining which component
   * should be injected from componentDefinitions
   */
  type?: string;
  /**
   * Called when toast starts closing.
   */
  onClose?: (metadata: ToastOptions) => any;
  /**
   * Called when toast is animted out, therefore is fully closed.
   */
  onClosed?: (metadata: ToastOptions) => any;
  /**
   * Called when toast starts opening.
   */
  onOpen?: (metadata: ToastOptions) => any;
  /**
   * Called when toast animeted in, therefore is fully open and visible.
   */
  onOpened?: (metadata: ToastOptions) => any;
}

export interface ToastDefaultOptions extends ToastOptions {
  /**
   * Default toast component if componentDefinitions is not provided
   * or type key doesn't match.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    error: ToastErrorComponent
   *    success: ToastSuccessComponent
   *    info: ToastInfoComponent
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation which will be used by Vue TransitionGroup
   */
  groupAnimationName?: string;
}

export interface ToastInjectionData {
  options: ToastDefaultOptions;
  store: {
    toasts: ToastItem[];
    autoRemovedToasts: ToastItem[];
  };
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export const toastKey = Symbol("toast-injection-key");
export const singleToastKey = Symbol("single-toast-key");

export function createProgrammaticToast(options: ToastDefaultOptions): Plugin {
  return {
    install: (app) => {
      const store = reactive({
        toasts: [] as ToastItem[],
        autoRemovedToasts: [] as ToastItem[],
      });

      app.provide<ToastInjectionData>(toastKey, { options, store });
    },
  };
}
