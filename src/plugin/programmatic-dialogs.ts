import { DefineComponent, Plugin, reactive } from "vue";

export interface DialogOptions {
  /**
   * Close the dialog on the cancel action?
   * Defaults to true
   */
  closeOnCancel?: boolean;
  /**
   * Close the dialog on the confirm action?
   * Defaults to true
   */
  closeOnConfirm?: boolean;
  /**
   * Close the dialog when the esc key pressed?
   * Defaults to true
   */
  closeOnEsc?: boolean;
  /**
   * Close the dialog when backdrop is clicked?
   * Defaults to true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Any valid css value.
   * Defaults to: var(--dialog-backdrop-color, rgba(0, 0, 0, 0.4))
   */
  backdropColor?: string;
  /**
   * These props will be passed down to your component.
   * If props where defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your dialog. Will be used when determining which component
   * should be injected from componentDefinitions
   */
  type?: string;
  /**
   * Aria (or actually any) attributes that will be applied to the dialog wrapper.
   * Defaults:
   *  - aria-modal="true"
   *  - role="dialog"
   */
  aria?: Record<string, string>;
  /**
   * Called when dialog starts closing.
   */
  onClose?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog is animted out, therefore is fully closed.
   */
  onClosed?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog starts opening.
   */
  onOpen?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog animeted in, therefore is fully open and visible.
   */
  onOpened?: (metadata: DialogOptions) => any;
  /**
   * Called when the cancel event happened.
   */
  onCancelled?: (metadata: DialogOptions) => any;
  /**
   * Called when the confirm event happened.
   */
  onConfirmed?: (metadata: DialogOptions) => any;
}

export interface DialogDefaultOptions extends DialogOptions {
  /**
   * Default toast component if componentDefinitions is not provided
   * or type key don't match.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    error: DialogErrorComponent
   *    success: DialogSuccessComponent
   *    info: DialogInfoComponent
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation that will be used by Vue TransitionGroup
   */
  animationName?: string;
}

export interface DialogInjectionData {
  options: DialogDefaultOptions;
  store: {
    dialogs: DialogItem[];
    removedDialogs: DialogItem[];
  };
}

export interface DialogItem extends DialogOptions {
  id: string;
}

export const dialogKey = Symbol("dialog-injection-key");
export const singleDialogKey = Symbol("single-dialog-key");

export function createProgrammaticDialog(options: DialogDefaultOptions): Plugin {
  return {
    install: (app) => {
      const store = reactive<DialogInjectionData["store"]>({
        dialogs: [],
        removedDialogs: [],
      });

      app.provide<DialogInjectionData>(dialogKey, { options, store });
    },
  };
}
