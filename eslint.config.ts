import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { globalIgnores } from 'eslint/config'

export default [
  defineConfigWithVueTs(
    {
      name: 'app/files-to-lint',
      files: ['**/*.{ts,mts,tsx,vue}'],
    },
    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting,
  ),

  defineConfigWithVueTs({
    name: 'disable-multi-word-for-pages',
    files: ['src/pages/**/*.vue'], // путь к директории
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }),
]
