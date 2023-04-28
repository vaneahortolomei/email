<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="modal-overlay">
        <div class="modal-dialog">
          <div class="modal-window">
            <div class="modal-window__content">
              <button
                type="button"
                class="modal-window__close-btn"
                @click="emit('closeModal')"
              >
                X
              </button>
              <slot name="modal-content" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
    import useKeyDown from "../helpers/useKeyEvents.js";

    export default {
        name: "ModalComponent",
        emits: ["closeModal"],
        setup(props, {emit}) {
            useKeyDown([
                {eKey: "Escape", eventMethod: () => emit("closeModal")},
                {eKey: "Enter", eventMethod: () => alert("test")},
            ]);
            return {
                emit,
                useKeyDown,
            };
        },
    };
</script>
