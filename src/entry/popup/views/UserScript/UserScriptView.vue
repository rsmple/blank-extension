<template>
  <div>
    Item {{ $route.params.userScriptId }}

    <RouterLink :to="{name: RouteName.USER_SCRIPT_LIST}">
      Back
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'

import {RouteName} from '@popup/utils/RouteName'
</script>