export function useTableStyle() {
  // 样式
  const headerCellStyle = {
    // height: '40px',
    // border: 0,
    // fontWeight: 600,
    // backgroundColor: 'rgb(246, 247, 251)',
  }

  const cellStyle = {
    // padding: 0,
    // height: '35px',
    // fontSize: '0.9rem',
    // color: '#474748',
  }
  // 计算属性
  const layout = computed(() => {
    const layout = ['prev', 'pager', 'next']
    //   if (pagingSizes.length)
    //     layout.push('sizes')

    return layout.join(', ')
  })
  return {
    headerCellStyle,
    cellStyle,
    layout,
  }
}
