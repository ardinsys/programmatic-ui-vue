import { PropType, DefineComponent, onMounted, provide, defineComponent } from "vue";
import { singleToastKey } from "../../plugin/programmatic-toasts";

export const Toast = defineComponent({
  name: "Toast",
  props: {
    id: {
      type: String,
      required: true,
    },
    component: {
      type: Object as PropType<DefineComponent<{}, {}, any>>,
      required: true,
    },
    autoClose: {
      type: Boolean,
      default: () => true,
    },
    autoCloseTimeout: {
      type: Number,
      default: () => 5000,
    },
    injectionProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => {},
    },
  },

  emits: {
    autoClose: () => true,
  },

  setup(props, { emit }) {
    provide(singleToastKey, props.id);

    onMounted(() => {
      if (props.autoClose) {
        setTimeout(() => {
          emit("autoClose");
        }, props.autoCloseTimeout);
      }
    });

    return () => (
      <div id={props.id} role="alert" class="toast-element">
        <props.component {...props.injectionProps}></props.component>
      </div>
    );
  },
});
