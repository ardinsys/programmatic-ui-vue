<template>
  <div class="preloader-container">
    <div class="preloader-backdrop"></div>
    <div class="preloader-modal">
      <div class="preloader">
        {{ test }}
        <span class="preloader-inner">
          <span class="preloader-inner-circle"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  test: string;
}>();
</script>

<style scoped>
.preloader-backdrop {
  width: 100%;
  height: 100%;
  background: none;
  z-index: 12000;
}

.preloader-inner {
  position: absolute;
  left: 0;
  top: 0;
}

.preloader-inner-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  border: calc(24px / 8) solid white;
  border-top-color: transparent;
  box-sizing: border-box;
  animation: aurora-preloader-rotate 0.75s linear infinite;
}

.preloader {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  font-size: 0;
  position: relative;
}

.preloader .preloader-inner {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}
/* === Preloader Modal === */
.preloader-backdrop {
  visibility: visible;
  opacity: 0;
  background: none;
  z-index: 10;
}
.preloader-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 8px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 14500;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 4px;
  z-index: 11;
}

.preloader-modal .preloader {
  display: block !important;
}

@keyframes aurora-preloader-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
