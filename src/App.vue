<script setup lang="ts">
import { onMounted } from "vue";
import { ToastContainer } from "./components/toast/ToastContainer";
import { DialogContainer } from "./components/dialog/DialogContainer";
import { useToasts } from "./hooks/useToasts";
import { ToastALignment } from "./plugin/programmatic-toasts";
import { useDialogs } from "./hooks/useDialogs";

const toasts = useToasts();
const dialogs = useDialogs();

let toast: any = null;

function createToasts(id: number, pos: ToastALignment) {
  toast = toasts.show({
    position: pos,
    autoClose: id !== 3,
    props: {
      thisWillBeInjectedAsProp: `${pos} ${id}`,
    },
  });
}

function showToasts(id: number, pos: ToastALignment) {
  return new Promise((resolve) => {
    setTimeout(() => {
      createToasts(id, pos);
      resolve(null);
    }, 500);
  });
}

async function toastTest() {
  await Promise.all([
    showToasts(1, "bottom-center"),
    showToasts(1, "bottom-left"),
    // showToasts(1, "bottom-right"),
    // showToasts(1, "top-left"),
    // showToasts(1, "top-right"),
    // showToasts(1, "top-center"),
    // showToasts(1, "center"),
  ]);
  await Promise.all([
    showToasts(2, "bottom-center"),
    showToasts(2, "bottom-left"),
    // showToasts(2, "bottom-right"),
    // showToasts(2, "top-left"),
    // showToasts(2, "top-right"),
    // showToasts(2, "top-center"),
    // showToasts(2, "center"),
  ]);
  await Promise.all([
    showToasts(3, "bottom-center"),
    showToasts(3, "bottom-left"),
    // showToasts(3, "bottom-right"),
    // showToasts(3, "top-left"),
    // showToasts(3, "top-right"),
    // showToasts(3, "top-center"),
    // showToasts(3, "center"),
  ]);
  setTimeout(() => {
    toast.updateProps({
      thisWillBeInjectedAsProp: "reactive prop update",
    });
    // toast.close();
  }, 1000);
}

onMounted(async () => {
  // toastTest();
  const toast = toasts.show({
    autoClose: false,
    props: {
      thisWillBeInjectedAsProp: "Hello there",
    },
  });

  const dialog = dialogs.show({
    aria: {
      "aria-labelledby": "test",
    },
  });
  setTimeout(() => {
    dialogs.show({
      type: "info",
      props: {
        myReactiveProp: "Hello Word!",
      },
    });
  }, 100);
});
</script>

<template>
  <main style="margin: auto; width: fit-content">
    <h1>Programmatic Notifications</h1>
    <!-- <input type="text" placeholder="focusable input" autofocus /> -->
    <p v-for="(_, i) in Array.from({ length: 30 })" :key="i" style="max-width: 80ch">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus doloremque ipsam eveniet
      sunt voluptatem? Sit doloribus excepturi quos perferendis aut voluptate nisi, voluptatibus
      assumenda temporibus, reprehenderit perspiciatis, dolor expedita eaque!
    </p>
  </main>
  <DialogContainer />
  <ToastContainer />
</template>

<style>
:root {
  /* You can override the spacing */
  --toast-margin-x: 30px;
  --toast-margin-y: 30px;
  --toast-margin-gap: 5px;
  /** 
  * apply some width for better transitions
  * this should mirror your injected component width settings
  */
  --toast-container-width: min(270px, 90vw);

  /* --dialog-backdrop-color: purple; */
}

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
}

input {
  width: 90ch;
  padding: 10px 20px;
}
</style>
