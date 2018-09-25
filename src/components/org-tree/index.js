import OrgTree from './org-tree'

const install = Vue => {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component(OrgTree.name, OrgTree)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default {
  install,
  name: 'Vue2OrgTree'
}
