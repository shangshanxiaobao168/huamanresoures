import PageTools from '@/components/PageTools'
import UploadExecl from '@/components/UploadExecl'
const components = [PageTools, UploadExecl]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
