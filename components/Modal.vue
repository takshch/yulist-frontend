<template>
  <div class="modal">
    <div class="modal__body">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal__body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
</style>
