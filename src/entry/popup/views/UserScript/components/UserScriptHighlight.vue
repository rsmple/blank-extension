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
  color: #0066cc;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#5dade2]
}

/* Built-in objects: console, Object, Array, etc. */
.token.builtin {
  color: #e74c3c;
  font-weight: 500;
  letter-spacing: -0.015em;

  @apply dark:text-[#f1948a];
}

/* Class names */
.token.class-name {
  color: #8e44ad;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#bb8fce];
}

/* Function names */
.token.function {
  color: #2980b9;
  font-weight: 500;
  letter-spacing: -0.015em;

  @apply dark:text-[#7fb3d3];
}

/* Boolean values: true, false */
.token.boolean {
  color: #c0392b;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#ec7063];
}

/* Numbers */
.token.number {
  color: #d68910;
  font-weight: 500;
  letter-spacing: -0.015em;

  @apply dark:text-[#f4d03f];
}

/* Strings */
.token.string {
  color: #27ae60;

  @apply dark:text-[#82e0aa];
}

/* Character literals */
.token.char {
  color: #27ae60;

  @apply dark:text-[#82e0aa];
}

/* Symbols */
.token.symbol {
  color: #8e44ad;

  @apply dark:text-[#bb8fce];
}

/* Regular expressions */
.token.regex {
  color: #e67e22;
  background: rgba(230, 126, 34, 0.1);
  border-radius: 2px;

  @apply dark:text-[#f8c471] dark:bg-[rgba(248,196,113,0.15)];
}

/* URLs */
.token.url {
  color: #3498db;
  text-decoration: underline;

  @apply dark:text-[#85c1e9];
}

/* Operators: +, -, *, /, =, ==, ===, etc. */
.token.operator {
  color: #34495e;
  font-weight: 600;
  letter-spacing: -0.03em;

  @apply dark:text-[#d5d8dc];
}

/* Variables */
.token.variable {
  color: #2c3e50;

  @apply dark:text-[#d5dbdb];
}

/* Constants */
.token.constant {
  color: #c0392b;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  @apply dark:text-[#ec7063];
}

/* Object properties */
.token.property {
  color: #8e44ad;

  @apply dark:text-[#bb8fce];
}

/* Punctuation: brackets, semicolons, commas */
.token.punctuation {
  color: #7f8c8d;

  @apply dark:text-[#aeb6bf];
}

/* Important declarations */
.token.important {
  color: #e74c3c;
  font-weight: 700;
  letter-spacing: -0.045em;

  @apply dark:text-[#f1948a];
}

/* Comments */
.token.comment {
  color: #95a5a6;
  font-style: italic;
  opacity: 0.8;

  @apply dark:text-[#85929e];
}

.token .token {
  background: none;
  padding: 0;
}
</style>