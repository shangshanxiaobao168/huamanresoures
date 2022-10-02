export const imgError = {
  // 当被绑定的元素插入到dom中时
  // 指令绑定的元素插入到dom的时候，图片数据还没请求回来
  inserted(el, { value }) {
    if (!el.src) {
      el.src = value
    }
    // 监听dom img 图片加载失败的事件
    else
      el.onerror = function () {
        el.src = value
      }
  },
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
}
