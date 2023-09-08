<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-15 10:09:32
 * @LastEditors: 程
 * @LastEditTime: 2022-11-15 11:58:51
-->
<template>
  <div class="main">
    <el-button type="primary" @click="screenshot">截图</el-button>
    <div ref="imageTofile">
      <img src="@/assets/images/image.png" alt="">
    </div>
  </div>

</template>
<script setup lang='ts'>
import html2canvas from 'html2canvas';
import { parseDate } from '@/utils/index'

const imageTofile = ref(null)
function screenshot() {
  // 手动创建一个 canvas 标签
  const canvas = document.createElement('canvas')
  // 获取父标签，意思是这个标签内的 DOM 元素生成图片
  // imageTofile是给截图范围内的父级元素自定义的ref名称
  let canvasBox: any = imageTofile.value
  // 获取父级的宽高
  const width = parseInt(window.getComputedStyle(canvasBox).width)
  const height = parseInt(window.getComputedStyle(canvasBox).height)
  // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
  canvas.width = width * 2
  canvas.height = height * 2
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  const context = canvas.getContext('2d') as any
  context.scale(2, 2)
  html2canvas(canvasBox, { allowTaint: true }).then((canvas) => {
    //转换base64
    const capture = canvas.toDataURL('image/png')
    //下载浏览器弹出下载信息的属性
    const saveInfo = {
      //导出文件格式自己定义，我这里用的是时间作为文件名
      download: parseDate(new Date(), 'ymd') + `.png`,
      href: capture,
    }
    //下载，浏览器弹出下载文件提示
    downloadFile(saveInfo)
    //调用服务端保存接口
    // axios
    //   .post('/controller/testCases/uploadStempImg', {
    //     caseId: props.steps[0].caseId,
    //     projectId: props.steps[0].projectId,
    //     base64Img: capture,
    //   })
    //   .then((resp) => {
    //     if (resp['code'] === 2000) {
    //       ElMessage.success({
    //         message: resp['message'],
    //       })
    //       emit('flush')
    //     }
    //   })
  })
}

//下载截图
function downloadFile(saveInfo: any) {
  const element = document.createElement('a')
  element.style.display = 'none'
  for (const key in saveInfo) {
    element.setAttribute(key, saveInfo[key])
  }
  document.body.appendChild(element)
  element.click()
  setTimeout(() => {
    document.body.removeChild(element)
  }, 300)
}


</script>
<style lang='less' scoped>
.main {
  margin-top: 20px;

  img {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
}
</style>