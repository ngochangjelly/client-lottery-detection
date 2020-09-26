<template>
  <v-container>
    <p v-if="fullProvince" class="description">
      <span class="label">XSTKT </span>{{ fullProvince }}
    </p>
    <v-skeleton-loader
      v-if="analyzing"
      class="loader-indicator"
      width="50%"
      type="text"
    />
    <p v-if="date" class="description">
      <span class="label">Phát hành ngày: </span>{{ date }}
    </p>
    <v-skeleton-loader
      v-if="analyzing"
      class="loader-indicator"
      width="50%"
      type="text"
    />
    <p v-if="serieNumber" class="description">
      <span class="label">Số serie: </span>{{ serieNumber }}
    </p>
    <v-skeleton-loader
      v-if="analyzing"
      class="loader-indicator"
      width="50%"
      type="text"
    />
    <p v-if="message" class="description">
      <span class="label">Kết quả: </span>{{ message }}
    </p>
    <v-skeleton-loader
      v-if="analyzing"
      class="loader-indicator"
      width="50%"
      type="text"
    />
    <div>{{ action }}</div>
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
import { sendImage } from '../script/service';
import constants from '../constants';

export default {
  name: 'HelloWorld',
  data: () => ({
    imageData: null,
    serieNumber: null,
    analyzing: false,
    message: '',
    fullProvince: null,
    date: null,
    action: constants.message.upload,
  }),
  methods: {
    reset() {
      this.serieNumber = null;
      this.message = null;
      this.date = null;
      this.fullProvince = null;
      this.$refs.fileInput.value = '';
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.analyzing = true;
          this.imageData = e.target.result;
          this.action = constants.message.analyzing;
          try {
            const response = await sendImage(e.target.result);
            const { message, serie, date, fullProvince } = response.data;
            if (serie) {
              this.serieNumber = serie;
            } else {
              this.serieNumber = constants.message.cantProcess;
            }
            if (message) {
              this.message = message;
            }
            if (date) {
              this.date = date;
            }
            if (fullProvince) {
              this.fullProvince = fullProvince;
            }
            this.analyzing = false;
            this.action = constants.message.upload;
          } catch (err) {
            this.analyzing = false;
            this.serieNumber = constants.message.errorProcess;
          }
        };
        reader.readAsDataURL(files[0]);
        this.$emit('input', files[0]);
      }
    },
    chooseImage() {
      this.reset();
      this.$refs.fileInput.click();
    },
  },
};
</script>
<style lang="scss">
.container {
  .loader-indicator {
    width: 80%;
    display: flex;
    justify-items: flex-start;
  }
  .label {
    font-weight: bold;
    text-align: left;
  }
  .description {
    text-align: left;
    width: 80%;
  }
  .v-skeleton-loader {
    margin-left: -50%;
    margin-bottom: 16px;
    height: 16px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
  align-items: center;
  height: 100vh;
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
