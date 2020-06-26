<template>
  <v-container class="container">
    <!-- <div>
      lottery detection
    </div>
    <span v-if="!imageData" class="placeholder">
      Choose an Image
    </span>
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <v-file-input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      ></v-file-input>
    </div> -->
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
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
      />
      <!-- <v-file-input
        class="file-input"
        ref="fileInput"
        type="file"
        @input="onSelectFile"
      ></v-file-input> -->
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    imageData: null,
  }),
  methods: {
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
          console.log('reader.onload -> e.target.result', e.target.result);
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
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
  }
  .placeholder {
    background: #f0f0f0;
    width: 100%;
    height: 100%;
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
