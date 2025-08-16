<template>
  <div>
    List

    <div>
      <RouterLink
        v-for="i in 10"
        :key="i"
        :to="{name: RouteName.USER_SCRIPT, params: {userScriptId: i}}"
      >
        Item {{ i }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'

import {RouteName} from '@popup/utils/RouteName'
</script>