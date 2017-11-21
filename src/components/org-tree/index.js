import OrgTree from './org-tree'
import OrgTreeNode from './org-tree-node'

const install = (Vue) => {
  if (install.installed) {
    return
  }

  install.installed = true

  Vue.component(OrgTree.name, OrgTree)
  Vue.component(OrgTreeNode.name, OrgTreeNode)
}

export {
  OrgTree,
  OrgTreeNode
}

export default {
  OrgTree,
  OrgTreeNode,
  install
}
