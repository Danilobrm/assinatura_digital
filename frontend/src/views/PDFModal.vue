<template>
  <div v-if="show" class="pdf-viewer">
    <button @click="closeViewer">Fechar</button>
    <iframe :src="pdfData" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  props: ['pdfData', 'show'],
  methods: {
    closeViewer() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.pdf-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
iframe {
  border: none;
}
</style>
