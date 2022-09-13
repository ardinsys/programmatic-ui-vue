import { DefineComponent, inject, Plugin, reactive } from "vue";

export interface SpinnerOptions {
  /**
   * These props will be passed down to your component.
   * If props where defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your spinner. Will be used when determining which component
   * should be injected from componentDefinitions.
   */
  type?: string;
}

export interface SpinnerDefaultOptions extends SpinnerOptions {
  /**
   * Default component to be used.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    loading1: Spinner1Component
   *    loading2: Spinner2Component
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation name which will be passed directly to the Transition component.
   * It's "dialog-fade" by default.
   */
  animationName?: string;
}

export interface SpinnerInjectionData {
  store: {
    visible: boolean;
    currentOptions?: SpinnerOptions;
  };
  options: SpinnerDefaultOptions;
}

export const spinnerKey = Symbol("spinner-injection-key");

let injectionData: SpinnerInjectionData;

export function injectSpinner() {
  return injectionData || inject<SpinnerInjectionData>(spinnerKey);
}

export function createProgrammaticSpinner(options: SpinnerDefaultOptions): Plugin {
  return {
    install: (app) => {
      const store = reactive({
        visible: false,
      });

      injectionData = { store, options };

      app.provide(spinnerKey, injectionData);
    },
  };
}
