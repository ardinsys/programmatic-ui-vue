import { DefineComponent, defineComponent, h, PropType } from "vue";
import { useDialog } from "../../hooks/useDialog";
import { withOnlyClick } from "../../utils/clickListener";
import { withKeyModifiers } from "../../utils/keyboardEventListener";

export const DialogClose = defineComponent({
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
          "aria-controls": dialog.id,
          ...attrs,
          onClick: withOnlyClick(() => {
            if (enterTriggered) return;
            dialog.close();
          }),
          onKeydown: withKeyModifiers(() => {
            enterTriggered = true;
            dialog.close();
          }, ["Enter"]),
        },
        slots.default?.()
      );
  },
});
