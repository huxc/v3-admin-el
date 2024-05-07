export const cusProps = {
  model: {
    type: Object,
    default: () => {}
    },
  formItems: {
    type: Array,
    required: true
    },
  inline: {
    type: Boolean,
    default: false
    },
  submitMsg: {
    type: [Boolean, String],
    default: '提交'
    },
  resetMsg: {
    type: [Boolean, String],
    default: '重置'
    },
  labelWidth: {
    type: String,
    default: 'auto'
    },
  footer: {
    type: Boolean,
    default: false
    },
  gutter: {
    type: Number,
    default: 24
    },
  rules: {
    type: Object,
    default: () => {}
    }
}
