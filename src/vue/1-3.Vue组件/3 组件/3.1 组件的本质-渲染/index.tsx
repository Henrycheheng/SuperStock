export const MyComponent = function () {
  return {
    tag: 'MyComponent',
    props: {
      onclick: () => alert('hello world'),
    },
    children: '点击',
  }
}

function render(vnode: { tagName: any }, container: { appendChild: (arg0: any) => void }) {
  if (typeof vnode.tagName === 'string') {
    // 标签
    mountElement(vnode.tagName, container)
  } else {
    // 有children，并且是一个数组
    mountComponent(vnode, container)
  }
}

// 渲染原有的HTML标签
function mountElement(vnode: any, container: any) {
  // vnode的tag属性来作为创建 dom的元素
  const el = document.createElement(vnode?.tag)

  // 遍历vnode的props属性
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(), // click
        vnode?.props[key]
      )
    }
  }

  // children
  if (typeof vnode?.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode?.children)) {
    // 使用当前元素的el作为挂载点
    vnode.children.forEach((child: { tagName: any }) => render(child, el))
  }

  container.appendChild(el)
}

// 渲染原有的组件标签
function mountComponent(vnode: { tagName: any } | undefined, container: any | undefined) {
  // 调用组件函数，获取组件要渲染的内容
  const subTree = vnode?.tagName
  // 递归的调用 render() 渲染后续的 subTree
  render(subTree, container)
}

// MyComponent是一个对象

export const MyComponent1 = {
  render() {
    return {
      tag: 'MyComponent',
      props: {
        onclick: () => alert('hello world'),
      },
      children: '点击',
    }
  },
}
