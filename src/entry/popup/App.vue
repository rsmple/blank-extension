<template>
  <RouterView />

  <WTooltipContainer />

  <WNotify />

  <WModal />
</template>

<script setup lang="ts">
import WModal from 'eco-vue-js/dist/components/Modal/WModal.vue'
import WNotify from 'eco-vue-js/dist/components/Notify/WNotify.vue'
import WTooltipContainer from 'eco-vue-js/dist/components/Tooltip/WTooltipContainer.vue'
</script>