<template>
  <v-app>
    <v-content>
      <Input />
    </v-content>
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
