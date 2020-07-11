<template>
  <v-app>
    <v-main>
      <Input />
    </v-main>
  </v-app>
</template>

<script>
import Input from './components/Input';

export default {
  name: 'App',

  components: {
    Input,
  },

  data: () => ({
    //
  }),
};
</script>
