<template>
  <div class="not-print:grid-cols-[var(--nav-bar-width),1fr] grid h-screen w-full print:grid-cols-1">
    <div class="not-print:-pt--header-height not-print:col-start-2 -px--inner-margin h-auto w-full">
      <RouterView />
    </div>
  </div>

  <WTooltipContainer />

  <WNotify />

  <WModal />
</template>

<script setup lang="ts">
import WModal from 'eco-vue-js/dist/components/Modal/WModal.vue'
import WNotify from 'eco-vue-js/dist/components/Notify/WNotify.vue'
import WTooltipContainer from 'eco-vue-js/dist/components/Tooltip/WTooltipContainer.vue'
</script>