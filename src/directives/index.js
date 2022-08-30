export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value
    }
  },
}
