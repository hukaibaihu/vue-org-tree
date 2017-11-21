<template>
  <div class="org-tree-node">
    <div class="org-tree-node-label" @click="$emit('on-node-click', data)">
      <slot name="label" :data="data">{{data[props.label]}}</slot>
    </div>
    <div v-if="children && children.length" class="org-tree-node-children">
      <slot :data="data">
        <org-tree-node
          v-if="children && children.length"
          v-for="child in children"
          :data="child"
          :props="props"
          :key="child.id"
          @on-node-click="$emit('on-node-click', $event)"
        ></org-tree-node>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrgTreeNode',
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
    }
  },
  computed: {
    children () {
      return this.data[this.props.children] || []
    }
  }
}
</script>
