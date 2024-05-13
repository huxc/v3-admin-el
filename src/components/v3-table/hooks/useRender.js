import { h } from 'vue'

/**
 * h函数渲染
 */
function Render(props) {
  const params = {
    row: props.row,
    index: props.index,
  }
  return props.render(h, params)
}

Render.props = {
  row: Object,
  index: Number,
  render: Function,
}

export default Render
