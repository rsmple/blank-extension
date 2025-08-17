import type {UserScript} from '@/models/UserScript'

import type {ListFields} from 'eco-vue-js/dist/components/List/types'
import {getDefaultFieldConfigMap} from 'eco-vue-js/dist/utils/utils'

import * as FieldUserScriptDateCreated from './WFieldUserScriptDateCreated.vue'
import * as FieldUserScriptIsEnabled from './WFieldUserScriptIsEnabled.vue'
import * as FieldUserScriptName from './WFieldUserScriptName.vue'
import * as FieldUserScriptUrlPattern from './WFieldUserScriptUrlPattern.vue'

export const listFieldsUserScript = [
  FieldUserScriptName,
  FieldUserScriptUrlPattern,
  FieldUserScriptIsEnabled,
  FieldUserScriptDateCreated,
] as const satisfies ListFields<UserScript, QueryParamsBulk>

export const defaultFieldConfigMapUserScript = getDefaultFieldConfigMap(listFieldsUserScript, ['name', 'url_pattern', 'is_enabled', 'created_at'])