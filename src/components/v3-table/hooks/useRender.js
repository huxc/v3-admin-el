import { h } from 'vue'

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
