<script setup>
const props = defineProps({ featObj: Object });
</script>

<template>
  <v-card class="mx-auto description">
    <v-card-item>
      <v-card-title class="text-center">
        {{ props.featObj.name }}
      </v-card-title>
      <!-- <v-card-subtitle> Card subtitle secondary text </v-card-subtitle> -->
    </v-card-item>

    <v-card-text>
      {{ props.featObj.description }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.description {
  width: 100%;
  height: 200px;
}
</style>
