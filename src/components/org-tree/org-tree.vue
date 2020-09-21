<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal, collapsable}">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        :selected-class-name="selectedClassName"
        :selected-key="selectedKey"
        @on-expand="(e, data) => $emit('on-expand', e, data)"
        @on-node-focus="(e, data) => $emit('on-node-focus', e, data)"
        @on-node-click="(e, data) => $emit('on-node-click', e, data)"
        @on-node-mouseover="(e, data) => $emit('on-node-mouseover', e, data)"
        @on-node-mouseout="(e, data) => $emit('on-node-mouseout', e, data)"
        @on-node-drag-start="(e, data) => onDragStart(e, data)"
        @on-node-drag-over="(e, data) => onDragOver(e, data)"
        @on-node-drop="(e, data) => onDrop(e, data)"
      />
    </div>
  </div>
</template>



<script>
import render from "./node";

export default {
  name: "Vue2OrgTree",
  data() {
    return {
      dragState: {
        dragg: null,
        drop: null,
      },
    };
  },
  components: {
    OrgTreeNode: {
      render,
      functional: true,
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        expand: "expand",
        children: "children",
      }),
    },
    horizontal: Boolean,
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String],
  },
  methods: {
    onDragStart(event, data) {
      let dragState = this.dragState;
      try {
        event.dataTransfer.setData("text/plain", "");
      } catch (e) {}
      dragState.drag = data;
    },
    onDragOver(event, data) {
      event.preventDefault();
    },
    onDrop(event, data) {
      event.preventDefault();
      let dragState = this.dragState;
      let drag = dragState.drag;
      dragState.drop = data;
      this.$emit("on-node-drop", event, drag, data);
    },
  },
};
</script>

<style lang="less">
@import "../../styles/org-tree";
</style>
