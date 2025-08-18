<template>
  <div class="grid h-screen w-full grid-cols-[1fr]">
    <WHeaderBar :title="$route.meta.title" />

    <div class="not-print:-pt--header-height -px--inner-margin h-auto w-full">
      <RouterView />
    </div>
  </div>

  <WTooltipContainer />

  <WNotify />

  <WModal />
</template>

<script setup lang="ts">
import WHeaderBar from 'eco-vue-js/dist/components/HeaderBar/WHeaderBar.vue'
import WModal from 'eco-vue-js/dist/components/Modal/WModal.vue'
import WNotify from 'eco-vue-js/dist/components/Notify/WNotify.vue'
import WTooltipContainer from 'eco-vue-js/dist/components/Tooltip/WTooltipContainer.vue'
</script>