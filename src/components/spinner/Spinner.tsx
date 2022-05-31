import { DefineComponent, defineComponent, PropType } from "vue";

export const Spinner = defineComponent({
  name: "Spinner",

  props: {
    component: {
      type: Object as PropType<DefineComponent<{}, {}, any>>,
      required: true,
    },
    injectionProps: {
      type: Object as PropType<Record<string | number | symbol, any>>,
    },
  },

  setup(props) {
    return () => <props.component {...props.injectionProps} />;
  },
});
