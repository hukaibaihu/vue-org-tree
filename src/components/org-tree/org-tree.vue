<template>
  <div class="org-tree-container" :class="{vertical}">
    <slot :data="data">
      <org-tree-node :data="data" :props="props" @on-node-click="$emit('on-node-click', $event)"></org-tree-node>
    </slot>
  </div>
</template>

<script>
import OrgTreeNode from './org-tree-node'

export default {
  name: 'OrgTree',
  components: {
    OrgTreeNode
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        id: 'id',
        label: 'label',
        children: 'children'
      })
    },
    vertical: Boolean
  }
}
</script>

<style lang="less">
@import '../../styles/org-tree';
</style>
