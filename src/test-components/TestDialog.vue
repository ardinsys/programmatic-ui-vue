<template>
  <div class="dialog" style="display: flex; flex-direction: column">
    <div style="flex-grow: 1">
      <h2 style="display: flex; align-items: center; margin: 10px 0">
        <span style="flex-grow: 1">Random dialog title</span>
        <DialogClose>CLOSE</DialogClose>
      </h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt qui sed suscipit officia
        quas adipisci distinctio? Explicabo ab quisquam provident, aspernatur voluptatem ipsam
        beatae quos, quas reiciendis, nostrum earum hic! Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Ad, sed nulla? Earum quasi adipisci laudantium natus accusamus saepe
        obcaecati qui itaque, tempora nisi voluptatem id eius. Possimus quos animi ipsum!
      </p>
    </div>
    <div style="display: flex; align-items: center; gap: 10px">
      <DialogCancel>CANCEL</DialogCancel>
      <DialogConfirm>CONFIRM</DialogConfirm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDialog } from "../hooks/useDialog";
import { DialogCancel } from "../components/dialog/DialogCancel";
import { DialogConfirm } from "../components/dialog/DialogConfirm";
import { DialogClose } from "../components/dialog/DialogClose";

export default defineComponent({
  components: {
    DialogCancel,
    DialogClose,
    DialogConfirm,
  },

  setup() {
    const dialog = useDialog();
  },
});
</script>

<style scoped>
.dialog {
  width: 500px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.6);
  padding: 30px;
  /* you can put it in any position */
  /* position: absolute;
  bottom: 10px; */
  background-color: rgb(53, 53, 53);
  color: rgb(247, 247, 247);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
}

button {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  border: none;
  padding: 5px 10px;
  margin: 0;
  cursor: pointer;
  background: none;
  color: rgb(189, 107, 243);
  font-size: 14px;
  font-weight: bold;
}
</style>
