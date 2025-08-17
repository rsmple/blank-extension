<template>
  <WButtonSelectionAction
    title="Create Script"
    :icon="markRaw(IconAdd)"
    :disabled="readonly"
    :loading="loading"
    @click="createItem"
  />
</template>

<script lang="ts" setup>
import {markRaw, ref} from 'vue'
import {useRouter} from 'vue-router'

import type {ActionProps} from 'eco-vue-js/dist/components/List/types'

import WButtonSelectionAction from 'eco-vue-js/dist/components/Button/WButtonSelectionAction.vue'

import IconAdd from 'eco-vue-js/dist/assets/icons/sax/IconAdd'

import {useApiUserScript} from '@/entry/popup/views/UserScript/api/ApiUserScript'
import {RouteName} from '@popup/utils/RouteName'

defineProps<ActionProps<QueryParamsBulk>>()

const router = useRouter()

const apiUserScript = useApiUserScript()

const loading = ref(false)

const createItem = () => {
  if (loading.value) return

  loading.value = true

  apiUserScript.create({})
    .then(response => router.push({name: RouteName.USER_SCRIPT, params: {userScriptId: response.data.id}}))
    .finally(() => {
      loading.value = false
    })
}
</script>
