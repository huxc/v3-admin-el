import antfu from '@antfu/eslint-config'
import globs from './.eslintrc-auto-import.json'

export default antfu(
  {
    globals: globs.globals,
    vue: {
      overrides: {
        'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      },
    },
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    }
  },
)
