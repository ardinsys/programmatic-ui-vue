import { inject } from "vue";
import { SpinnerInjectionData, spinnerKey, SpinnerOptions } from "../plugin/programmatic-spinner";

export interface SpinnerController {
  show: (options?: SpinnerOptions) => void;
  hide: () => void;
  updateProps: (props: Record<string, any>) => void;
}

export function useSpinner(): SpinnerController {
  const spinnerStore = inject<SpinnerInjectionData>(spinnerKey)!;
  if (!spinnerStore) throw Error("Programmatic spinner plugin must be registered!");

  return {
    show(options?: SpinnerOptions) {
      spinnerStore.store.currentOptions = options;
      spinnerStore.store.visible = true;
    },
    hide: () => {
      spinnerStore.store.visible = false;
      spinnerStore.store.currentOptions = undefined;
    },
    updateProps: (props: Record<string, any>) => {
      if (spinnerStore.store.currentOptions?.props) {
        spinnerStore.store.currentOptions.props = props;
      }
    },
  };
}
