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
    ignores: [
        '**/eslint.config.js',
        '**/vite_config',
        '**/routers/modules/*.js'
    ]
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
      'jsdoc/check-param-names':'off',
      "jsdoc/check-alignment": "error",
      "jsdoc/require-description": ["error", {"descriptionStyle":"any"}],
      'jsdoc/require-jsdoc': ['error', {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      }],
    }
  }
)