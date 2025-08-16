<template>
  <RouterLink
    :to="{name: RouteName.USER_SCRIPT, params: {userScriptId: item.id}}"
    class="w-ripple w-ripple-hover relative col-span-full grid grid-cols-subgrid grid-rows-[3rem] px-2 [&>*]:grid [&>*]:items-center"
  >
    <WToggle
      :model-value="item.is_enabled"
      small
    />

    <div>
      <div class="truncate">
        {{ item.name }}
      </div>
    </div>

    <div>
      <div class="truncate">
        {{ item.url_pattern }}
      </div>
    </div>

    <div>
      {{ dateFormat(new Date(item.updated_at)) }}
    </div>

    <div>
      {{ dateFormat(new Date(item.created_at)) }}
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type {UserScript} from '@/models/UserScript'

import {RouterLink} from 'vue-router'

import {dateFormat} from 'eco-vue-js/dist/utils/dateTime'

import WToggle from 'eco-vue-js/dist/components/Toggle/WToggle.vue'

import {RouteName} from '@popup/utils/RouteName'

defineProps<{
  item: UserScript
}>()
</script>