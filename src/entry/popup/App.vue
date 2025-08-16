<template>
  <div class="-p--inner-margin">
    <WInput
      v-model="value"
      title="Input"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

import WInput from 'eco-vue-js/dist/components/Input/WInput.vue'

const value = ref('')

onMounted(() => {
  value.value = 'Test'
})
</script>