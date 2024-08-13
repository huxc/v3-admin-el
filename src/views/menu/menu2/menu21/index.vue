<template>
  <div>
    <div ref="chartRef" style="width: 400px; height: 300px;display: none;" />
    <button @click="handleDownload">
      下载
    </button>
    <div id="preview" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { renderAsync } from 'docx-preview'
import { AlignmentType, Document, ImageRun, Packer, PageBreak, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx'

const docxBlobUrl = ref(null)
const chartRef = ref(null)
let chartInstance

/**
 * generateChartImage
 */
function generateChartImage() {
  return new Promise((resolve) => {
    const imageData = chartInstance.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    })
    resolve(imageData)
  })
}

/**
 * generateDocx
 */
async function generateDocx() {
  const chartImageData = await generateChartImage()

  // 将 base64 图片数据转为 Uint8Array
  const base64Data = chartImageData.split(',')[1]
  const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))

  // 创建一个新的 Word 文档
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: 'Heading1', // 设置为一级标题
            alignment: AlignmentType.CENTER, // 将标题居中
            children: [
              new TextRun({
                text: '一级标题',
                bold: true,
              }),
            ],
          }),
          // 插入分页符
          new Paragraph({
            children: [
              new PageBreak(), // 添加分页符
            ],
          }),
          // 创建一个表格
          new Table({
            rows: generateTableRows(4, 3),
          }),
          new Paragraph('这是一个带有 ECharts 图表的 Word 文档：'),
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: 400,
                  height: 300,
                },
              }),
            ],
          }),
        ],

      },
    ],
  })

  // 将文档转换为 Blob 并下载
  Packer.toBlob(doc).then((blob) => {
    docxBlobUrl.value = URL.createObjectURL(blob)

    // 使用 docx-preview 渲染 Blob 到页面
    const container = document.getElementById('preview')
    container.innerHTML = '' // 清空之前的内容
    renderAsync(blob, container)
  })
}

/**
 * 生成表格的行
 */
function generateTableRows(rows, cols) {
  const tableRows = []

  // 生成表头行
  tableRows.push(
    new TableRow({
      children: Array.from({ length: cols }, (_, colIndex) =>
        new TableCell({
          children: [new Paragraph(`标题 ${colIndex + 1}`)],
          width: { size: 2000, type: 'dxa' }, // 设置单元格宽度
          shading: { fill: 'CCCCCC' }, // 设置背景色
        })),
    }),
  )

  // 生成数据行
  for (let rowIndex = 0; rowIndex < rows - 1; rowIndex++) {
    tableRows.push(
      new TableRow({
        children: Array.from({ length: cols }, (_, colIndex) =>
          new TableCell({
            children: [new Paragraph(`数据 ${rowIndex * cols + colIndex + 1}`)],
          })),
      }),
    )
  }

  return tableRows
}
/**
 * 下载word
 */
function handleDownload() {
  const a = document.createElement('a')
  a.href = docxBlobUrl.value
  a.download = 'chart.docx'
  a.click()
  URL.revokeObjectURL(docxBlobUrl.value)
}
/**
 * 根据url获取blob
 */
// async function fetchAndRenderDocx(url) {
//   try {
//     const response = await fetch(url)
//     if (!response.ok)
//       throw new Error('Network response was not ok')

//     const blob = await response.blob()

//     // 使用 docx-preview 渲染 Blob 到页面
//     const container = document.getElementById('preview')
//     container.innerHTML = '' // 清空之前的内容
//     renderAsync(blob, container)
//   }
//   catch (error) {
//     console.error('Error fetching or rendering the document:', error)
//   }
// }

onMounted(async () => {
  chartInstance = echarts.init(chartRef.value)

  // ECharts 配置
  const option = {
    animation: false, // 禁用所有动画
    title: {
      text: 'ECharts 示例图表',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }

  chartInstance.setOption(option)
  await generateDocx()
})
</script>

  <style>
  /* 可根据需求调整样式 */
</style>
