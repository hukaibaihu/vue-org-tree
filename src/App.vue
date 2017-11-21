<template>
  <div id="app" style="padding:100px;text-align:center;">
    <org-tree :data="orgData" :vertical="true" @on-node-click="onNodeClick">
      <!-- <org-tree-node :data="orgData" @on-node-click="onNodeClick">
        <org-tree-node v-if="orgData.children" v-for="child in orgData.children" :data="child" @on-node-click="onNodeClick" :key="child.id"></org-tree-node>
      </org-tree-node> -->
    </org-tree>
  </div>
</template>

<script>
import {OrgTree, OrgTreeNode} from './components/org-tree'

export default {
  name: 'app',
  components: {
    OrgTree,
    OrgTreeNode
  },
  data () {
    return {
      orgData: {
        id: 1,
        label: '企易购科技有限公司',
        children: [{
          id: 2,
          label: '研发部',
          children: [{
            id: 5,
            label: '研发-前端'
          }, {
            id: 6,
            label: '研发-后端'
          }]
        }, {
          id: 3,
          label: '销售部',
          children: [{
            id: 7,
            label: '销售一部'
          }, {
            id: 8,
            label: '销售二部'
          }]
        }, {
          id: 4,
          label: '财务部'
        }, {
          id: 9,
          label: 'HR人事'
        }]
      }
    }
  },
  methods: {
    onNodeClick (node) {
      console.log(node)
    }
  }
}
</script>
