import antfu from '@antfu/eslint-config'
import globs from './.eslintrc-auto-import.json' assert {type: 'json'}

export default antfu(
  {
    vue: {
      overrides: {
        'vue/block-order': ['error', { order: ['template', 'script', 'style'] }]
      },
    },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier'
    },
  },
  {
    languageOptions: {
      globals:{
        ...globs.globals
      },
    }
  },
  {
    rules: {
        'comma-dangle': ["error", "never"]
    }
  }
)