import { getDepOptions } from '@/hooks/useOptions'

/**
 * 查询条件配置
 */
export function useSearch() {
  const collapse = true // 搜索框可折叠
  const defaultOver = false
  const searchItems = [
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 0, label: '男' },
          { value: 1, label: '女' },
        ],
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
      },
      attrs: {
        key: 'age',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },

    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
      },
      attrs: {
        key: 'idCard',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '邮箱',
      },
      attrs: {
        key: 'email',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '部门',
      },
      attrs: shallowReactive({
        key: 'depid',
        placeholder: '请选择部门',
        subProps: {
          value: 'id',
          label: 'name',
        },
        options: [],
      }),
    },
    {
      tag: 'date',
      itemAttrs: {
        label: '创建时间',
      },
      attrs: {
        key: 'createTime',
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '性别',
      },
      attrs: {
        key: 'gender',
        options: [
          { value: 0, label: '男' },
          { value: 1, label: '女' },
        ],
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '年龄',
      },
      attrs: {
        key: 'age',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },

    {
      tag: 'input',
      itemAttrs: {
        label: '身份证',
      },
      attrs: {
        key: 'idCard',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },
    {
      tag: 'input',
      itemAttrs: {
        label: '邮箱',
      },
      attrs: {
        key: 'email',
        maxlength: 10,
        placeholder: '请输入工号',
      },
    },
    {
      tag: 'select',
      itemAttrs: {
        label: '部门',
      },
      attrs: shallowReactive({
        key: 'depid',
        placeholder: '请选择部门',
        subProps: {
          value: 'id',
          label: 'name',
        },
        options: [],
      }),
    },
    {
      tag: 'date',
      itemAttrs: {
        label: '创建时间',
      },
      attrs: {
        key: 'createTime',
      },
    },
  ]

  // 动态给key='depid'的options赋值
  getDepOptions(searchItems, 'depid')

  return {
    collapse,
    defaultOver,
    searchItems,
  }
}
