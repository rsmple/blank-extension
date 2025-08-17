<template>
  <WButtonMoreItem
    text="Delete"
    :icon="markRaw(IconTrash)"
    :disabled="readonly"
    @click="deleteUserScript.deleteItem"
  />
</template>

<script lang="ts" setup>
import type {UserScript} from '@/models/UserScript'

import {computed, markRaw} from 'vue'

import type {MenuEmits, MenuProps} from 'eco-vue-js/dist/components/List/types'

import WButtonMoreItem from 'eco-vue-js/dist/components/Button/WButtonMoreItem.vue'

import IconTrash from 'eco-vue-js/dist/assets/icons/sax/IconTrash'

import {useDeleteUserScript} from '@/entry/popup/views/UserScript/use/useDeleteUserScript'

const props = defineProps<MenuProps<UserScript>>()

defineEmits<MenuEmits<UserScript>>()

const deleteUserScript = useDeleteUserScript(computed(() => props.item.id))
</script>