<template>
  <div class="pb-16">
    <WButton
      :to="{name: RouteName.USER_SCRIPT_LIST}"
      :semantic-type="SemanticType.SECONDARY"
      class="w-button-rounded-2xl w-max"
      @click="deleteScript"
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
      title="URL pattern"
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

      :debounce="1000"
      hide-debounce
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

    <div class="flex items-center gap-4">
      <WButton
        :semantic-type="SemanticType.SECONDARY"
        :disabled="loadingApplyDraft || isApplied"
        :loading="loadingResetDraft"
        class="min-w-32"
        @click="resetDraft"
      >
        Reset draft
      </WButton>

      <WButton
        :semantic-type="SemanticType.PRIMARY"
        :disabled="loadingResetDraft || isApplied"
        :loading="loadingApplyDraft"
        class="min-w-32"
        @click="applyDraft"
      >
        Apply draft
      </WButton>

      <div
        v-if="queryUserScript.data.value?.draft"
        class="text-description"
      >
        {{ isApplied ? 'Draft is applied' : 'Draft is not applied yet' }} <component
          :is="isApplied ? IconCheck : IconCancel"
          class="square-[1.25em] -mt-0.5 inline"
          :class="{
            'text-description': !isApplied,
            'text-positive dark:text-positive-dark': isApplied,
          }"
        />
      </div>
    </div>

    <div class="pb-20" />

    <WButton
      :semantic-type="SemanticType.NEGARIVE"
      @click="deleteUserScript.deleteItem"
    >
      Delete Script
    </WButton>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {Notify} from 'eco-vue-js/dist/utils/Notify'
import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {handleApiError} from 'eco-vue-js/dist/utils/api'
import {parseId} from 'eco-vue-js/dist/utils/utils'

import WButton from 'eco-vue-js/dist/components/Button/WButton.vue'
import WFormAsyncInput from 'eco-vue-js/dist/components/FormAsync/WFormAsyncInput.vue'
import WFormAsyncToggle from 'eco-vue-js/dist/components/FormAsync/WFormAsyncToggle.vue'

import IconCancel from 'eco-vue-js/dist/assets/icons/default/IconCancel'
import IconCheck from 'eco-vue-js/dist/assets/icons/default/IconCheck'

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

const isApplied = computed(() => queryUserScript.data.value?.draft === queryUserScript.data.value?.script)

const deleteScript = () => {
  if (!queryUserScript.data.value) return

  if (queryUserScript.data.value.name || queryUserScript.data.value.url_pattern || queryUserScript.data.value.draft || queryUserScript.data.value.script) return

  apiUserScript.delete()
}

const loadingResetDraft = ref(false)

const resetDraft = () => {
  if (loadingResetDraft.value || !queryUserScript.data.value) return 
  
  loadingResetDraft.value = true

  apiUserScript
    .update({draft: queryUserScript.data.value.script})
    .then(response => {
      queryUserScript.setData(response.data)
      Notify.success({title: 'Draft reset'})
    })
    .catch(error => handleApiError(error, undefined, 'draft'))
    .finally(() => {
      loadingResetDraft.value = false
    })
}

const loadingApplyDraft = ref(false)

const applyDraft = () => {
  if (loadingApplyDraft.value || !queryUserScript.data.value) return 
  
  loadingApplyDraft.value = true

  apiUserScript
    .update({script: queryUserScript.data.value.draft})
    .then(response => {
      queryUserScript.setData(response.data)
      Notify.success({title: 'Draft applied'})
    })
    .catch(error => handleApiError(error, undefined, 'script'))
    .finally(() => {
      loadingApplyDraft.value = false
    })
}
</script>