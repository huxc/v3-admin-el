import fs  from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import antfu from '@antfu/eslint-config'

// 获取 __dirname 等效的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const globalsPath = path.resolve(__dirname, '.eslintrc-auto-import.json');
const { globals } = JSON.parse(fs.readFileSync(globalsPath, 'utf-8'));


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
      globals,
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