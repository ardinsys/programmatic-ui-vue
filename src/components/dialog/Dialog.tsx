import {
  DefineComponent,
  defineComponent,
  PropType,
  provide,
  ref,
  onUnmounted,
  onMounted,
} from "vue";
import { DialogItem, singleDialogKey } from "../../plugin/programmatic-dialogs";
import { withKeyModifiers } from "../../utils/keyboardEventListener";
import { FocusTrap, trapFocus } from "../../utils/trapFocus";

export const Dialog = defineComponent({
  name: "Dialog",

  props: {
    id: {
      type: String,
      required: true,
    },
    dialog: {
      type: Object as PropType<DialogItem>,
      required: true,
    },
    component: {
      type: Object as PropType<DefineComponent<{}, {}, any>>,
      required: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: () => true,
    },
    closeOnBackdropClick: {
      type: Boolean,
      default: () => true,
    },
    backdropColor: {
      type: String,
      required: true,
    },
    aria: {
      type: Object as PropType<Record<string, string>>,
      default: () => {},
    },
  },

  emits: ["close"],

  setup(props, { emit }) {
    const dialogRef = ref<HTMLElement>();
    let focusTrap: FocusTrap;

    onMounted(() => {
      focusTrap = trapFocus(dialogRef.value!);
    });

    onUnmounted(() => {
      focusTrap.release();
    });

    provide(singleDialogKey, props.dialog);

    return () => (
      <div
        id={props.id}
        style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; display: flex; align-items: center; justify-content: center;"
        onKeydown={withKeyModifiers(() => {
          if (!props.closeOnEsc) return;
          emit("close");
        }, ["Escape"])}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: props.backdropColor,
          }}
          onClick={() => props.closeOnBackdropClick && emit("close")}
        ></div>
        <div
          ref={dialogRef}
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          style="z-index: 101; outline: none;"
          {...props.aria}
        >
          <props.component {...props.dialog.props} />
        </div>
      </div>
    );
  },
});
