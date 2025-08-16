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
            v-for="item in list"
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
import type {UserScript} from '@/models/UserScript'

import UserScriptItem from './components/UserScriptItem.vue'

const list: UserScript[] = Array(15).fill(null).map((_, index) => ({
  id: index + 1,
  name: `Script ${ index + 1 }`,
  is_enabled: true,
  script: '',
  draft: '',
  url_pattern: `https://some-site.empty/page-${ index + 1 }/index.php`,
  created_at: new Date(),
  updated_at: new Date(),
}))
</script>