<template>
  <component :is="h('pre', null, rendered)" />
</template>

<script setup lang="ts">
import {Token, languages, tokenize} from 'prismjs'
import {type VNode, computed, h} from 'vue'

const props = defineProps<{
  modelValue: string | undefined
}>()

const mapFn = (token: string | Token): VNode => typeof token === 'string'
  ? h('span', token)
  : h('span', {class: `token ${ token.type }`}, Array.isArray(token.content) ? token.content.map(mapFn) : token.content.toString())

const rendered = computed<VNode[]>(() => props.modelValue ? tokenize(props.modelValue, languages.javascript).map(mapFn) : [])
</script>

<style>
/* Keywords: const, let, var, function, if, else, etc. */
.token.keyword {
  color: #cc7832;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#cc7832];
}

/* Built-in objects: console, Object, Array, etc. */
.token.builtin {
  color: #8888c6;
  font-weight: normal;

  @apply dark:text-[#8888c6];
}

/* Class names */
.token.class-name {
  color: #a9b7c6;
  font-weight: normal;

  @apply dark:text-[#a9b7c6];
}

/* Function names */
.token.function {
  color: #ffc66d;
  font-weight: normal;

  @apply dark:text-[#ffc66d];
}

/* Boolean values: true, false */
.token.boolean {
  color: #cc7832;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#cc7832];
}

/* Numbers */
.token.number {
  color: #6897bb;
  font-weight: normal;

  @apply dark:text-[#6897bb];
}

/* Strings */
.token.string {
  color: #6a8759;

  @apply dark:text-[#6a8759];
}

/* Character literals */
.token.char {
  color: #6a8759;

  @apply dark:text-[#6a8759];
}

/* Symbols */
.token.symbol {
  color: #a9b7c6;

  @apply dark:text-[#a9b7c6];
}

/* Regular expressions */
.token.regex {
  color: #287bde;
  background: rgba(40, 123, 222, 0.1);
  border-radius: 2px;

  @apply dark:text-[#287bde] dark:bg-[rgba(40,123,222,0.1)];
}

/* URLs */
.token.url {
  color: #287bde;
  text-decoration: underline;

  @apply dark:text-[#287bde];
}

/* Operators: +, -, *, /, =, ==, ===, etc. */
.token.operator {
  color: #a9b7c6;
  font-weight: normal;

  @apply dark:text-[#a9b7c6];
}

/* Variables */
.token.variable {
  color: #a9b7c6;

  @apply dark:text-[#a9b7c6];
}

/* Constants */
.token.constant {
  color: #9876aa;
  font-weight: normal;
  text-transform: uppercase;

  @apply dark:text-[#9876aa];
}

/* Object properties */
.token.property {
  color: #9876aa;

  @apply dark:text-[#a9b7c6];
}

/* Punctuation: brackets, semicolons, commas */
.token.punctuation {
  color: #a9b7c6;

  @apply dark:text-[#a9b7c6];
}

/* Important declarations */
.token.important {
  color: #cc7832;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#cc7832];
}

/* Comments */
.token.comment {
  color: #808080;
  font-style: italic;

  @apply dark:text-[#808080];
}

.token .token {
  background: none;
  padding: 0;
}
</style>