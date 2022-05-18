import { DefineComponent, defineComponent, h, PropType } from "vue";
import { useToast } from "../../hooks/useToast";
import { withOnlyClick } from "../../utils/clickListener";
import { withKeyModifiers } from "../../utils/keyboardEventListener";

export const ToastClose = defineComponent({
  name: "ToastClose",

  props: {
    as: {
      type: [String, Object] as PropType<string | DefineComponent<any, any, any>>,
      default: () => "button",
    },
  },

  setup(props, { slots, attrs }) {
    let closed = false;

    const toast = useToast();
    function onClose() {
      if (closed) return;
      closed = true;
      toast.close();
    }

    let enterTriggered = false;

    return () =>
      h(
        props.as,
        {
          tabindex: 0,
          ...attrs,
          onClick: withOnlyClick(() => {
            if (enterTriggered) return;
            onClose();
          }),
          onKeydown: withKeyModifiers(() => {
            enterTriggered = true;
            onClose();
          }, ["Enter"]),
        },
        slots.default?.()
      );
  },
});
