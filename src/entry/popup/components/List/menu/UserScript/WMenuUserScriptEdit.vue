<template>
  <WButtonMoreItem
    text="Edit"
    :icon="markRaw(IconEdit)"
    :disabled="readonly"
    :to="{
      name: RouteName.USER_SCRIPT,
      params: {userScriptId: item.id},
    }"
  />
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import {markRaw} from 'vue'

import type {MenuEmits, MenuProps} from 'eco-vue-js/dist/components/List/types'

import WButtonMoreItem from 'eco-vue-js/dist/components/Button/WButtonMoreItem.vue'

import IconEdit from 'eco-vue-js/dist/assets/icons/sax/IconEdit'

import {RouteName} from '@popup/utils/RouteName'

defineProps<MenuProps<UserScript>>()

defineEmits<MenuEmits<UserScript>>()
</script>