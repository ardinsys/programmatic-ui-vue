import { defineComponent, inject, Transition, watch } from "vue";
import { SpinnerInjectionData, spinnerKey } from "../../plugin/programmatic-spinner";
import { Spinner } from "./Spinner";

export const SpinnerContainer = defineComponent({
  name: "SpinnerContainer",

  setup() {
    const spinner = inject<SpinnerInjectionData>(spinnerKey)!;

    function getComponent() {
      return spinner.options.componentDefinitions
        ? spinner.options.componentDefinitions[spinner.store.currentOptions?.type || ""] ||
            spinner.options.component
        : spinner.options.component;
    }

    watch(
      () => spinner.store.visible,
      (visible) => {
        if (visible) document.body.classList.add("spinner-util-overflow-hidden");
        else document.body.classList.remove("spinner-util-overflow-hidden");
      }
    );

    return () => (
      <Transition name={spinner?.options.animationName || "dialog-fade"} appear>
        {spinner.store.visible ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "fixed",
              left: 0,
              top: 0,
              zIndex: 10000,
            }}
            role="status"
            aria-busy="true"
          >
            <Spinner
              component={getComponent()}
              injectionProps={{ ...spinner.options.props, ...spinner.store.currentOptions?.props }}
            />
          </div>
        ) : null}
      </Transition>
    );
  },
});
