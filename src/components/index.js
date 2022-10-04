import PageTools from '@/components/PageTools'
import UploadExecl from '@/components/UploadExecl'
import UploadImg from '@/components/UploadImg'
const components = [PageTools, UploadExecl, UploadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
