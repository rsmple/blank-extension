<template>
  <div class="pb-16">
    <WButton
      :to="{name: RouteName.USER_SCRIPT_LIST}"
      :semantic-type="SemanticType.SECONDARY"
      class="w-button-rounded-2xl w-max"
      @click="resetScript"
    >
      <IconArrowRight class="rotate-180" /> Back
    </WButton>

    <div class="pb-10" />

    <WFormAsyncInput
      title="Name"
      field="name"
      :use-query-fn="useQueryUserScript"
      :query-params="id"
      :api-method="apiUserScript.update"
    />

    <WFormAsyncToggle
      :title="queryUserScript.data.value?.is_enabled ? 'Enabled' : 'Disabled'"
      right-label
      small
      field="is_enabled"
      :use-query-fn="useQueryUserScript"
      :query-params="id"
      :api-method="apiUserScript.update"
    />

    <WFormAsyncInput
      title="URL pattern RegExp"
      field="url_pattern"
      :use-query-fn="useQueryUserScript"
      :query-params="id"
      :api-method="apiUserScript.update"
      mono
    />

    <div class="pb-10" />

    <WFormAsyncInput
      title="Script"
      field="draft"
      :use-query-fn="useQueryUserScript"
      :query-params="id"
      :api-method="apiUserScript.update"

      saved-text="Draft saved"
      textarea
      resize
      mono
      text-transparent
    >
      <template #before="{modelValue}">
        <UserScriptHighlight
          :model-value="modelValue"
          class="pointer-events-none absolute cursor-text font-mono"
        />
      </template>
    </WFormAsyncInput>

    <div class="py-4" />

    <div class="pb-10" />

    <WButton
      :semantic-type="SemanticType.NEGARIVE"
      @click="deleteUserScript.deleteItem"
    >
      Delete Script
    </WButton>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {parseId} from 'eco-vue-js/dist/utils/utils'

import WButton from 'eco-vue-js/dist/components/Button/WButton.vue'
import WFormAsyncInput from 'eco-vue-js/dist/components/FormAsync/WFormAsyncInput.vue'
import WFormAsyncToggle from 'eco-vue-js/dist/components/FormAsync/WFormAsyncToggle.vue'

import IconArrowRight from '@popup/assets/icons/IconArrowRight.svg?component'

import {RouteName} from '@popup/utils/RouteName'

import {useApiUserScript} from './api/ApiUserScript'
import {useQueryUserScript} from './api/QueryUserScript'
import UserScriptHighlight from './components/UserScriptHighlight.vue'
import {useDeleteUserScript} from './use/useDeleteUserScript'

const route = useRoute()
const router = useRouter()

const id = computed(() => parseId(route.params.userScriptId))

const apiUserScript = useApiUserScript(id)
const queryUserScript = useQueryUserScript(id)
const deleteUserScript = useDeleteUserScript(id, () => router.replace({name: RouteName.USER_SCRIPT_LIST}))

const resetScript = () => {
  if (!queryUserScript.data.value) return

  if (queryUserScript.data.value.name || queryUserScript.data.value.url_pattern || queryUserScript.data.value.draft || queryUserScript.data.value.script) return

  apiUserScript.delete()
}
</script>