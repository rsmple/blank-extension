<template>
  <div class="-p--inner-margin">
    Item {{ $route.params.userScriptId }}

    <RouterLink :to="{name: RouteName.USER_SCRIPT_LIST}">
      Back
    </RouterLink>

    <div>
      <UserScriptItem
        v-if="queryUserScriptList.data.value"
        :item="queryUserScriptList.data.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {RouterLink, useRoute} from 'vue-router'

import {parseId} from 'eco-vue-js/dist/utils/utils'

import {RouteName} from '@popup/utils/RouteName'

import UserScriptItem from './components/UserScriptItem.vue'

import {useQueryUserScript} from '../../api/queries/UserScript'

const route = useRoute()

const id = computed(() => parseId(route.params.userScriptId))

const queryUserScriptList = useQueryUserScript(id)
</script>