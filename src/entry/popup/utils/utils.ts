import {numberFormatter} from 'eco-vue-js/dist/utils/utils'

export const selectAllTextGetter = (isSelect: boolean, count: number) => `${ isSelect ? 'Select all' : 'Unselect all' } (${ numberFormatter.format(count ?? 0) })`

export const validateIntegerWithZero = (value: unknown) => Number.isInteger(value) && (value as number) < 0 ? 'A valid integer is required' : undefined