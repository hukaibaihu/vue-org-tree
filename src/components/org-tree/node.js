const EVENTS = {
  CLICK: 'on-node-click',
  MOUSEOUT: 'on-node-mouseout',
  MOUSEOVER: 'on-node-mouseover'
}

function createListener (handler, data) {
  if (typeof handler === 'function') {
    return function (e) {
      // fixed bug #48
      if (e.target.className.indexOf('org-tree-node-btn') > -1) return

      handler.apply(null, [e, data])
    }
  }
}

// 判断是否叶子节点
const isLeaf = (data, prop) => {
  return !(Array.isArray(data[prop]) && data[prop].length > 0)
}

// 创建 node 节点
export function renderNode (h, data, context) {
  const { props } = context
  const cls = ['org-tree-node']
  const childNodes = []
  const children = data[props.props.children]

  if (isLeaf(data, props.props.children)) {
    cls.push('is-leaf')
  } else if (props.collapsable && !data[props.props.expand]) {
    cls.push('collapsed')
  }

  childNodes.push(renderLabel(h, data, context))

  if (!props.collapsable || data[props.props.expand]) {
    childNodes.push(renderChildren(h, children, context))
  }

  return h('div', {
    domProps: {
      className: cls.join(' ')
    }
  }, childNodes)
}

// 创建展开折叠按钮
export function renderBtn (h, data, { props, listeners }) {
  const expandHandler = listeners['on-expand']

  let cls = ['org-tree-node-btn']

  if (data[props.props.expand]) {
    cls.push('expanded')
  }

  return h('span', {
    domProps: {
      className: cls.join(' ')
    },
    on: {
      click: e => expandHandler && expandHandler(e,data)
    }
  })
}

// 创建 label 节点
export function renderLabel (h, data, context) {
  const { props, listeners } = context
  const email = data[props.props.email]
  const old_email = data[props.props.email] ? undefined : data[props.props.old_email]
  const is_active = !data[props.props.email] && data[props.props.tree_id] ? 'Не активирован' : undefined
  const is_banned = data[props.props.is_banned] ? 'Забанен' : undefined
  const first_name = data[props.props.first_name]
  const last_name = data[props.props.last_name]
  const tree_id = data[props.props.tree_id] !== null ? data[props.props.tree_id] : 'Нет ребенка'
  const parent_id = data[props.props.parent_id]
  const bin_acc_id = data[props.props.bin_acc_id]
  const renderContent = props.renderContent

  // event handlers
  const clickHandler = listeners[EVENTS.CLICK]
  const mouseOutHandler = listeners[EVENTS.MOUSEOUT]
  const mouseOverHandler = listeners[EVENTS.MOUSEOVER]

  const childNodes = []
  const childNodes2 = []
  const childNodes3 = []
  const childNodes4 = []
  const childNodes5 = []
  const childNodes6 = []
  const childNodes7 = []
  const childNodes8 = []
  const childNodes9 = []
  // const childNodes10 = []

  if (typeof renderContent === 'function') {
    let vnode = renderContent(h, data)

    vnode && childNodes.push(email)
      && childNodes8.push(old_email)
      && childNodes2.push(first_name)
      && childNodes3.push(last_name)
      && childNodes4.push(tree_id)
      && childNodes5.push(parent_id)
      && childNodes6.push(is_active)
      && childNodes7.push(is_banned)
      && childNodes9.push(bin_acc_id)
      // && childNodes10.push(node_id)
  } else {
    childNodes.push(email)
    childNodes8.push(old_email)
    childNodes2.push(first_name)
    childNodes3.push(last_name)
    childNodes4.push(tree_id)
    childNodes5.push(parent_id)
    childNodes6.push(is_active)
    childNodes7.push(is_banned)
    childNodes9.push(bin_acc_id)
    // childNodes10.push(node_id)
  }

  if (props.collapsable && !isLeaf(data, props.props.children)) {
    childNodes.push(renderBtn(h, data, context))
  }

  const cls = ['org-tree-node-label-inner']
  let { labelWidth, labelClassName, selectedClassName, selectedKey } = props

  if (typeof labelWidth === 'number') {
    labelWidth += 'px'
  }

  if (typeof labelClassName === 'function') {
    labelClassName = labelClassName(data)
  }

  labelClassName && cls.push(labelClassName)

  // add selected class and key from props
  if (typeof selectedClassName === 'function') {
    selectedClassName = selectedClassName(data)
  }

  selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName)

  return h('div', {
    domProps: {
      className: 'org-tree-node-label'
    }
  }, [h('div', {
    domProps: {
      className: cls.join(' ')
    },
    style: { width: labelWidth },
    on: {
      'click': createListener(clickHandler, data),
      'mouseout': createListener(mouseOutHandler, data),
      'mouseover': createListener(mouseOverHandler, data)
    }
  }, [h('div', {
    domProps: {
      className: 'user__is-active'
    },
  }, childNodes6),
    h('div', {
    domProps: {
      className: 'user__email'
    },
    }, childNodes),
    h('div', {
      domProps: {
        className: 'user__email'
      },
    }, childNodes8),
    h('div', {
      domProps: {
        className: 'user__first-name'
      },
    }, childNodes2),
    h('div', {
      domProps: {
        className: 'user__last-name'
      },
    }, childNodes3),
    h('div', {
      domProps: {
        className: 'user__tree-id'
      },
    }, childNodes4),
    h('div', {
      domProps: {
        className: 'user__is-banned'
      },
    }, childNodes7),
    h('div', {
      domProps: {
        className: 'user__bin-acc-id'
      },
    }, childNodes9),
    /*h('div', {
      domProps: {
        className: 'user__empty'
      },
    }, childNodes10)*/])])
}

// 创建 node 子节点
export function renderChildren (h, list, context) {
  if (Array.isArray(list) && list.length) {
    const children = list.map(item => {
      return renderNode(h, item, context)
    })

    return h('div', {
      domProps: {
        className: 'org-tree-node-children'
      }
    }, children)
  }
  return ''
}

export function render (h, context) {
  const {props} = context

  return renderNode(h, props.data, context)
}

export default render
