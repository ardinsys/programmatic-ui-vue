export { createProgrammaticToast } from "./plugin/programmatic-toasts";
export type { ToastOptions, ToastDefaultOptions } from "./plugin/programmatic-toasts";
export { useToast } from "./hooks/useToast";
export { useToasts } from "./hooks/useToasts";
export { ToastContainer } from "./components/toast/ToastContainer";
export { ToastClose } from "./components/toast/ToastClose";
import "./css/toast.css";

export { createProgrammaticDialog } from "./plugin/programmatic-dialogs";
export type { DialogDefaultOptions } from "./plugin/programmatic-dialogs";
export { useDialog } from "./hooks/useDialog";
export { useDialogs } from "./hooks/useDialogs";
export { DialogContainer } from "./components/dialog/DialogContainer";
export { DialogCancel } from "./components/dialog/DialogCancel";
export { DialogClose } from "./components/dialog/DialogClose";
export { DialogConfirm } from "./components/dialog/DialogConfirm";
import "./css/dialog.css";
