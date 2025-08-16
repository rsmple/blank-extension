<template>
  <div class="-p--inner-margin">
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
import UserScriptItem from './components/UserScriptItem.vue'

import {useQueryUserScriptList} from '../../api/queries/UserScript'

const queryUserScriptList = useQueryUserScriptList()
</script>