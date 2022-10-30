import PageTools from '@/components/PageTools'
import UploadExecl from '@/components/UploadExecl'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import FullScreen from '@/components/FullScreen'
import SvgIcon from '@/components/SvgIcon'
import ToggleLang from '@/components/ToggleLang'
const components = [
  PageTools,
  UploadExecl,
  UploadImg,
  Calendar,
  FullScreen,
  SvgIcon,
  ToggleLang,
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
