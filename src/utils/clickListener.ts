import { withModifiers } from "vue";

export function withOnlyClick(fn: Function, modifiers?: string[]) {
  const listener = (e: PointerEvent) => {
    if (e.type === "click") {
      fn(e);
    }
  };

  if (modifiers != undefined) {
    return withModifiers(listener, modifiers);
  }

  return listener;
}
