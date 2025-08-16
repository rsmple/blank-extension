<template>
  <div class="-p--inner-margin">
    Item {{ $route.params.userScriptId }}

    <RouterLink :to="{name: RouteName.USER_SCRIPT_LIST}">
      Back
    </RouterLink>

    <div>
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
      />

      <div class="pb-10" />

      <WFormAsyncInput
        field="draft"
        :use-query-fn="useQueryUserScript"
        :query-params="id"
        :api-method="apiUserScript.update"

        textarea
      />

      <div class="pb-10" />

      <WButton
        :semantic-type="SemanticType.NEGARIVE"
        @click="deleteUserScript.deleteItem"
      >
        Delete Script
      </WButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'

import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'
import {parseId} from 'eco-vue-js/dist/utils/utils'

import WButton from 'eco-vue-js/dist/components/Button/WButton.vue'
import WFormAsyncInput from 'eco-vue-js/dist/components/FormAsync/WFormAsyncInput.vue'
import WFormAsyncToggle from 'eco-vue-js/dist/components/FormAsync/WFormAsyncToggle.vue'

import {RouteName} from '@popup/utils/RouteName'

import {useApiUserScript} from './api/ApiUserScript'
import {useQueryUserScript} from './api/QueryUserScript'
import {useDeleteUserScript} from './use/useDeleteUserScript'

const route = useRoute()
const router = useRouter()

const id = computed(() => parseId(route.params.userScriptId))

const apiUserScript = useApiUserScript(id)
const queryUserScript = useQueryUserScript(id)
const deleteUserScript = useDeleteUserScript(id, () => router.replace({name: RouteName.USER_SCRIPT_LIST}))
</script>