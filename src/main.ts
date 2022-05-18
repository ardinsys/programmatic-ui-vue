import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
// @ts-ignore
import TestToast from "./test-components/TestToast.vue";
// @ts-ignore
import TestDialog from "./test-components/TestDialog.vue";
import { createProgrammaticToast, ToastDefaultOptions } from "./plugin/programmatic-toasts";
import { createProgrammaticDialog, DialogDefaultOptions } from "./plugin/programmatic-dialogs";
import "./css/toast.css";
import "./css/dialog.css";

const options: ToastDefaultOptions = {
  component: TestToast,
  autoClose: true,
  autoCloseTimeout: 5000,
  onClose: (toast) => {
    console.log("[Global] Closing toast: ", toast);
  },
  onClosed: (toast) => {
    console.log("[Global] Closed toast: ", toast);
  },
  onOpen: (toast) => {
    console.log("[Global] Opening toast: ", toast);
  },
  onOpened: (toast) => {
    console.log("[Global] Opened toast: ", toast);
  },
  // This is a fallback, when position is not provided. (btw this is the default fallback as well)
  position: "bottom-right",
  // Can be any string (default type, if invalid type provided).
  // Standard component will be used if type cannot be matched with componentDefinitions
  type: "info",
  // based on "type"
  componentDefinitions: {
    info: TestToast,
    error: null as any,
    success: null as any,
    random: null as any,
  },
  props: {
    thisWillBeInjectedAsProp: "Hello world",
  },
  // Must be in global css (fade is provided by default)
  groupAnimationName: "toast-fade",
};

const dialogOptions: DialogDefaultOptions = {
  component: TestDialog,
  // closeOnCancel: false,
  // closeOnConfirm: false,
  // closeOnEsc: false,
  // closeOnBackdropClick: false,
  // backdropColor: "purple",
};

createApp(App)
  .use(createProgrammaticToast(options))
  .use(createProgrammaticDialog(dialogOptions))
  .mount("#app");
