<template>
  <v-container class="container">
    <h1>{{ serieNumber }}</h1>
    <div id="image">imae</div>
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      id="preview"
      @click="chooseImage"
    >
      <span v-if="!imageData" class="placeholder">
        Choose an Image
      </span>
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
        accept="image/*;capture=camera"
      />
    </div>
  </v-container>
</template>

<script>
// import { imageDetection } from '../script/image-detection';
// import extractSerieNumber from '../script/extract-serie-number';
import { sendImage } from '../script/service';

export default {
  name: 'HelloWorld',
  data: () => ({
    imageData: null,
    serieNumber: 'lottery serie number',
  }),
  methods: {
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.imageData = e.target.result;
          const serieNumber = await sendImage(e.target.result);
          console.log('reader.onload -> serieNumber', serieNumber);
          this.serieNumber = serieNumber
            ? serieNumber.data
            : "Sorry we can't detect the image";
        };
        reader.readAsDataURL(files[0]);
        this.$emit('input', files[0]);
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
  },
};
</script>
<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  .file-input {
    width: 50%;
  }
  .base-image-input {
    display: block;
    width: 600px;
    height: 300px;
    border-radius: 8px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
    background-size: contain;
  }
  .placeholder {
    background: #f0f0f0;
    width: 600px;
    height: 300px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
  }
  .placeholder:hover {
    background: #e0e0e0;
  }
}
</style>
