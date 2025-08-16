<template>
  <div class="-p--inner-margin">
    <WButton
      :loading="loading"
      :semantic-type="SemanticType.SECONDARY"
      @click="addScript"
    >
      Add Script
    </WButton>

    <div class="overflow-x-auto overscroll-x-contain">
      <div class="grid grid-cols-[6rem,minmax(10rem,1fr),minmax(10rem,1fr),6em,6em] gap-x-2">
        <div class="bg-primary-darkest col-span-full grid grid-cols-subgrid px-2 py-1">
          <div>Enabled</div>

          <div>Name</div>

          <div>URL</div>

          <div>Updated</div>

          <div>Created</div>
        </div>

        <div class="col-span-full grid grid-cols-subgrid">
          <UserScriptItem
            v-for="item in queryUserScriptList.data.value"
            :key="item.id"
            :item="item"
            class="border-t border-solid border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import {SemanticType} from 'eco-vue-js/dist/utils/SemanticType'

import WButton from 'eco-vue-js/dist/components/Button/WButton.vue'

import {useApiUserScript} from './api/ApiUserScript'
import {useQueryUserScriptList} from './api/QueryUserScript'
import UserScriptItem from './components/UserScriptItem.vue'

import {RouteName} from '../../utils/RouteName'

const router = useRouter()

const queryUserScriptList = useQueryUserScriptList()
const apiUserScript = useApiUserScript()

const loading = ref(false)

const addScript = () => {
  if (loading.value) return

  loading.value = true

  apiUserScript.create({})
    .then(response => router.push({name: RouteName.USER_SCRIPT, params: {userScriptId: response.data.id}}))
    .finally(() => {
      loading.value = false
    })
}
</script>