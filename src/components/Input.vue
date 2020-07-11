<template>
  <v-container>
    <h3 class="title">{{ serieNumber }}</h3>
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      id="preview"
      @click="chooseImage"
    >
      <span role="icon" v-if="analyzing" class="scanner"></span>
      <span role="icon" v-if="!imageData" class="placeholder">
        <camera-icon></camera-icon>
      </span>
      <input
        :disabled="analyzing"
        class="file-input"
        id="upload-photo"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
        accept="image/*;capture=camera"
      />
    </div>
  </v-container>
</template>

<script>
import { sendImage } from "../script/service";

export default {
  name: "HelloWorld",
  data: () => ({
    imageData: null,
    serieNumber: "lottery serie number",
    analyzing: false
  }),
  methods: {
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = async e => {
          this.analyzing = true;
          this.imageData = e.target.result;
          this.serieNumber = "analyzing";
          const serieNumber = await sendImage(e.target.result);
          const tempSerie = serieNumber.data;

          const serieNumberRegex = /[0-9]*6/;
          if (!tempSerie) {
            this.analyzing = false;
            return;
          }
          if (serieNumberRegex.test(tempSerie)) {
            this.serieNumber = serieNumberRegex.exec(serieNumber.data)[0];
          } else {
            this.serieNumber = "Sorry we can't detect the image";
          }
          this.analyzing = false;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
        this.$refs.fileInput.value = "";
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    }
  }
};
</script>
<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  align-items: center;
  height: 100vh;
  .title {
    margin-bottom: 20px;
  }
  .file-input {
    width: 50%;
    opacity: 0;
  }
  .base-image-input {
    display: flex;
    justify-content: center;
    height: 300px;
    border-radius: 8px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-size: contain;
    flex-direction: column;
    align-content: center;
    position: relative;
    .camera-plus-icon {
      position: absolute;
      color: grey;
    }
    .scanner {
      position: absolute;
      left: 0;
      top: 25%;
      width: 100%;
      height: 50px;
      background-color: rgba(255, 84, 135, 0.54);
      z-index: 1;
      transform: translateY(4);
      animation: move 0.7s cubic-bezier(0.15, 0.44, 0.76, 0.64);
      animation-iteration-count: infinite;
    }
    .placeholder {
      background: #f0f0f0;
      width: 100%;
      height: 300px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 18px;
      font-family: Helvetica;
      backface-visibility: hidden;
    }
    .placeholder:hover {
      background: #e0e0e0;
    }
  }
}
@keyframes move {
  0%,
  100% {
    transform: translateY(135%);
  }
  50% {
    transform: translateY(0%);
  }
  75% {
    transform: translateY(272%);
  }
}
</style>
