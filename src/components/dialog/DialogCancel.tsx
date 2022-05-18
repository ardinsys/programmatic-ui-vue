import { DefineComponent, defineComponent, h, PropType } from "vue";
import { useDialog } from "../../hooks/useDialog";
import { withOnlyClick } from "../../utils/clickListener";
import { withKeyModifiers } from "../../utils/keyboardEventListener";

export const DialogCancel = defineComponent({
  props: {
    as: {
      type: [String, Object] as PropType<string | DefineComponent<any, any, any>>,
      default: () => "button",
    },
  },

  setup(props, { slots, attrs }) {
    const dialog = useDialog();

    let enterTriggered = false;

    return () =>
      h(
        props.as,
        {
          tabindex: 0,
          ...attrs,
          onClick: withOnlyClick(() => {
            if (enterTriggered) return;
            dialog.cancel();
          }),
          onKeydown: withKeyModifiers(() => {
            enterTriggered = true;
            dialog.cancel();
          }, ["Enter"]),
        },
        slots.default?.()
      );
  },
});
