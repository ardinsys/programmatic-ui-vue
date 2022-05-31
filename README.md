# Programmatic UI

**Show and hide your toasts, spinners and dialogs from your JS/TS code, while you leverage all of Vue 3 reactivity and component system.**

You don't need to declare hidden dialogs, spinners and toasts in your component templates which may never be opened anyways. You aren't limited to toasts that just display some text with a predefined design and positioning. Create your own dialog, spinner and toast components, register them into the plugin and use them with the built in type support.

## Features

- Use all of Vue 3's reactivity and component API
- Register components for different types, like for "error", you can have an ErrorDialog component regsitered.
- Types are fully customizable, you can have info, error, success, mylittletype, and anything as long as you register a component for it.
- You don't need to declare anything in your components template code to trigger some kind of open=true/false prop in the future.
- Focus trapping in dialogs.
- Accessibility support by default. You can even extend this via configuration.
- You can use your own components instead of some prebuild stuff.
- Animations? Sure there are reasonable (but optional) defaults you can use, but you can change them if you want.

## Getting started

### 1. Import the minimal styles

```ts
import "@ardinsys/programmatic-ui-vue/dist/styles.css";
```

### 2. Register the plugins

```ts
createApp(App)
  .use(createProgrammaticToast(toastOptions))
  .use(createProgrammaticDialog(dialogOptions))
  .use(createProgrammaticSpinner(spinnerOptions))
  .mount("#app");
```

### 3. Declare the containers

Add the render components at the end of your **App.vue** component.

```tsx
<DialogContainer />
<ToastContainer />
<SpinnerContainer />
```

### 4. Use dialogs, spinners and toasts

```ts
const dialogs = useDialogs();
const toasts = useToasts();
const spinner = useSpinner();

const dialog = dialogs.show({
  type: "info",
  props: {
    myReactiveProp: "Hello World!",
  },
});

const toast = toasts.show({
  position: "bottom-right",
  autoClose: false,
  props: {
    myReactiveProp: "Hello World!",
  },
});

spinner.show({
  type: "my-little-spinner",
  props: {
    myReactiveProp: "Hello World!",
  },
});
```

You can update the props of the rendered components:

```ts
toast.updateProps({
  myReactiveProp: "Hello reactive change!",
  myBrandNewProp: "Look at that, it's a new prop :)",
});
```

## Configuration

You can have a global configuration when you register the plugins, and then you can override this with when you show your toast or dialog.

### 1. Toasts

```ts
export type ToastALignment =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "center";

export interface ToastOptions {
  /**
   * Whether the toast should close after a certain timeout or not.
   * Defaults to true.
   */
  autoClose?: boolean;
  /**
   * Defines the time that autoClose will use in milliseconds. Has no effect if autoClose is disabled.
   */
  autoCloseTimeout?: number;
  /**
   * Defines the position of the toast.
   */
  position?: ToastALignment;
  /**
   * These props will be passed down to your component.
   * If props were defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your toast. Will be used when determining which component
   * should be injected from componentDefinitions
   */
  type?: string;
  /**
   * Called when toast starts closing.
   */
  onClose?: (metadata: ToastOptions) => any;
  /**
   * Called when toast is animted out, therefore is fully closed.
   */
  onClosed?: (metadata: ToastOptions) => any;
  /**
   * Called when toast starts opening.
   */
  onOpen?: (metadata: ToastOptions) => any;
  /**
   * Called when toast animeted in, therefore is fully open and visible.
   */
  onOpened?: (metadata: ToastOptions) => any;
}

export interface ToastDefaultOptions extends ToastOptions {
  /**
   * Default toast component if componentDefinitions is not provided
   * or type key doesn't match.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    error: ToastErrorComponent
   *    success: ToastSuccessComponent
   *    info: ToastInfoComponent
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation which will be used by Vue TransitionGroup
   */
  groupAnimationName?: string;
}
```

### 2. Dialogs

```ts
export interface DialogOptions {
  /**
   * Close the dialog on the cancel action?
   * Defaults to true
   */
  closeOnCancel?: boolean;
  /**
   * Close the dialog on the confirm action?
   * Defaults to true
   */
  closeOnConfirm?: boolean;
  /**
   * Close the dialog when the esc key pressed?
   * Defaults to true
   */
  closeOnEsc?: boolean;
  /**
   * Close the dialog when backdrop is clicked?
   * Defaults to true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Any valid css value.
   * Defaults to: var(--dialog-backdrop-color, rgba(0, 0, 0, 0.4))
   */
  backdropColor?: string;
  /**
   * These props will be passed down to your component.
   * If props where defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your dialog. Will be used when determining which component
   * should be injected from componentDefinitions
   */
  type?: string;
  /**
   * Aria (or actually any) attributes that will be applied to the dialog wrapper.
   * Defaults:
   *  - aria-modal="true"
   *  - role="dialog"
   */
  aria?: Record<string, string>;
  /**
   * Called when dialog starts closing.
   */
  onClose?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog is animted out, therefore is fully closed.
   */
  onClosed?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog starts opening.
   */
  onOpen?: (metadata: DialogOptions) => any;
  /**
   * Called when dialog animeted in, therefore is fully open and visible.
   */
  onOpened?: (metadata: DialogOptions) => any;
  /**
   * Called when the cancel event happened.
   */
  onCancelled?: (metadata: DialogOptions) => any;
  /**
   * Called when the confirm event happened.
   */
  onConfirmed?: (metadata: DialogOptions) => any;
}

export interface DialogDefaultOptions extends DialogOptions {
  /**
   * Default toast component if componentDefinitions is not provided
   * or type key don't match.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    error: DialogErrorComponent
   *    success: DialogSuccessComponent
   *    info: DialogInfoComponent
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation that will be used by Vue TransitionGroup
   */
  animationName?: string;
}
```

### 3. Spinners

```ts
export interface SpinnerOptions {
  /**
   * These props will be passed down to your component.
   * If props where defined in default options, then a shallow merge will be created.
   */
  props?: Record<string | number | symbol, any>;
  /**
   * Give a type to your spinner. Will be used when determining which component
   * should be injected from componentDefinitions.
   */
  type?: string;
}

export interface SpinnerDefaultOptions extends SpinnerOptions {
  /**
   * Default component to be used.
   */
  component: DefineComponent<{}, {}, any>;
  /**
   * Separate injected component based on type.
   * @example
   * {
   *    loading1: Spinner1Component
   *    loading2: Spinner2Component
   * }
   */
  componentDefinitions?: Record<string | symbol, DefineComponent<{}, {}, any>>;
  /**
   * Animation name which will be passed directly to the Transition component.
   * It's "dialog-fade" by default.
   */
  animationName?: string;
}
```

## Helper components

To manage state/event listeners and accessibility, you can use predefined headless components in your components that you are registered in your configuration.

For dialogs:

- DialogCancel
- DialogClose
- DialogConfirm

For toasts:

- ToastClose

All of these are rendered as a button by default, but you can change this by providing a string or a Vue component.

These are actions, therefore click/enter listeners will be applied to them with a tabindex="0" attribute.

## Helper hooks

Inside your toast/dialog components you can use the following hooks:

- useDialog
- useToast

These hooks provde the same functionality like the helper components mentioned above.
