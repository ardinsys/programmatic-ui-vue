<script setup lang="ts">
import { ToastClose } from "../components/toast/ToastClose";
defineProps({
  thisWillBeInjectedAsProp: String,
});
</script>

<template>
  <div class="test-toast">
    <div>
      {{ thisWillBeInjectedAsProp || "Injection failed" }}
    </div>
    <ToastClose as="button" tabindex="0">CLOSE</ToastClose>
  </div>
</template>

<style scoped>
.test-toast {
  padding: 10px 15px;
  background-color: rgb(53, 53, 53);
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  width: min(240px, 90vw);
  display: flex;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: center;
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

.test-toast > div:first-child {
  flex-grow: 1;
}
</style>
