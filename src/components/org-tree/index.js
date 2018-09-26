import OrgTree from './org-tree'

const install = Vue => {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component(OrgTree.name, OrgTree)
}

const plugin = {
  install,
  name: 'Vue2OrgTree'
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
