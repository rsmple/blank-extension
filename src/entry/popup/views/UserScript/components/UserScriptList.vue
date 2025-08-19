<template>
  <WList
    :use-query-fn="useQueryUserScriptListPaginated"
    :query-params="{}"
    selection-title="script"
    :fields="listFieldsUserScript"
    :default-config-map="defaultFieldConfigMapUserScript"
    :default-mode="ListMode.TABLE"
    config-key="w-list-user-script"
    :menu="[
      markRaw(WMenuUserScriptEdit),
      markRaw(WMenuUserScriptDelete),
    ]"
    :bulk="[
      markRaw(WBulkUserScriptEnable),
      markRaw(WBulkUserScriptDisable),
      markRaw(WBulkUserScriptDelete),
    ]"
    :action="[
      markRaw(WActionUserScriptCreate)
    ]"
    :select-all-text-getter="selectAllTextGetter"
    :card-columns="(['1fr', 'auto'] as const)"
    :card-areas="[
      ['name', 'area_select'],
      ['is_enabled', 'area_more'],
      ['url_pattern', 'url_pattern'],
      ['updated_at', 'updated_at'],
      ['created_at', 'created_at'],
      ['script', 'script'],
    ]"
    align-top
    :card-to="item => ({name: RouteName.USER_SCRIPT, params: {userScriptId: item.id}})"
    class="w-list-card-w-[18rem] sm:card:w-list-rounded-xl card:w-list-gap-4"
    card-class="sm:card:shadow sm:card:border border-gray-200 dark:border-gray-700 card:-p--inner-margin card:gap-2"
    card-wrapper-class="card:self-start"
  />
</template>

<script lang="ts" setup>
import {markRaw} from 'vue'

import {ListMode} from 'eco-vue-js/dist/utils/utils'

import WList from 'eco-vue-js/dist/components/List/WList.vue'

import WActionUserScriptCreate from '@/entry/popup/components/List/actions/UserScript/WActionUserScriptCreate.vue'
import WBulkUserScriptDelete from '@/entry/popup/components/List/bulk/UserScript/WBulkUserScriptDelete.vue'
import WBulkUserScriptDisable from '@/entry/popup/components/List/bulk/UserScript/WBulkUserScriptDisable.vue'
import WBulkUserScriptEnable from '@/entry/popup/components/List/bulk/UserScript/WBulkUserScriptEnable.vue'
import WMenuUserScriptDelete from '@/entry/popup/components/List/menu/UserScript/WMenuUserScriptDelete.vue'
import WMenuUserScriptEdit from '@/entry/popup/components/List/menu/UserScript/WMenuUserScriptEdit.vue'

import {defaultFieldConfigMapUserScript, listFieldsUserScript} from '@/entry/popup/components/List/fields/UserScript'
import {RouteName} from '@/entry/popup/utils/RouteName'
import {selectAllTextGetter} from '@popup/utils/utils'

import {useQueryUserScriptListPaginated} from '../api/QueryUserScript'
</script>