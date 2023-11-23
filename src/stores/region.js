import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegionStore = defineStore(
  "region",
  () => {
    const regionName = ref("");
    const moveRegion = (name) => {
      regionName.value = name;
    };

    return { regionName, moveRegion };
  },
  { persist: true }
);
