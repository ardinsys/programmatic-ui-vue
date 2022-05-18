import { withModifiers } from "vue";

export function withKeyModifiers(fn: Function, keyModifiers: string[], modifiers?: string[]) {
  const listener = (e: KeyboardEvent) => {
    if (e.key && keyModifiers.includes(e.key)) {
      fn(e);
    }
  };
  if (modifiers != undefined) {
    return withModifiers(listener, modifiers);
  }
  return listener;
}
