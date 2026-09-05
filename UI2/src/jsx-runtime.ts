/**
 * RedRedStar 极简 JSX 运行时
 *
 * 设计目标：只负责把 JSX 语法翻译成真实的 DOM 节点。
 * 没有虚拟 DOM、没有响应式属性绑定、没有 diff / effect。
 * 编译产物（tsc / oxc 的 react-jsx 自动运行时）会调用本模块的 jsx / jsxs / jsxDEV。
 */

export const Fragment: unique symbol = Symbol("RedRedStar.Fragment")

const SVG_NS = "http://www.w3.org/2000/svg"
const SVG_TAGS = new Set([
  "svg", "use", "path", "g", "defs", "symbol", "title", "desc", "text",
  "tspan", "textPath", "circle", "ellipse", "rect", "line", "polyline",
  "polygon", "image", "clipPath", "linearGradient", "radialGradient",
  "stop", "mask", "pattern", "filter", "feGaussianBlur", "marker", "switch",
])

type Props = { children?: unknown } & Record<string, unknown>

const isNode = (v: unknown): v is Node => v instanceof Node

/** 把 JSX 子节点递归拍平为 Node 列表：数组可嵌套，null/undefined/boolean 会被忽略。 */
function toNodes(children: unknown, out: Node[]): void {
  if (Array.isArray(children)) {
    for (const child of children) toNodes(child, out)
    return
  }
  if (children == null || typeof children === "boolean") return
  out.push(isNode(children) ? children : document.createTextNode(String(children)))
}

function setAttributes(el: Element, props: Props): void {
  for (const [k, raw] of Object.entries(props)) {
    // 自动运行时注入/约定的特殊字段
    if (k === "children" || k === "key" || k === "ref") continue
    if (k === "__self" || k === "__source") continue
    if (raw == null) continue

    if (k === "className") {
      el.setAttribute("class", String(raw))
      continue
    }
    if (k === "htmlFor") {
      el.setAttribute("for", String(raw))
      continue
    }
    if (k === "style") {
      if (typeof raw === "string") el.setAttribute("style", raw)
      else Object.assign((el as HTMLElement).style, raw as Partial<CSSStyleDeclaration>)
      continue
    }
    if (k.startsWith("on") && k.length > 2 && typeof raw === "function") {
      // onClick -> "click"；注意这是静态挂载，元素不会重渲染，请勿依赖闭包里的新值
      el.addEventListener(k.slice(2).toLowerCase(), raw as EventListener)
      continue
    }
    if (raw === false) continue
    if (raw === true) {
      el.setAttribute(k, "")
      continue
    }
    el.setAttribute(k, String(raw))
  }
}

function createElement(tag: string): Element {
  return SVG_TAGS.has(tag)
    ? document.createElementNS(SVG_NS, tag)
    : document.createElement(tag)
}

function appendChildren(el: Element | DocumentFragment, children: unknown): typeof el {
  const nodes: Node[] = []
  toNodes(children, nodes)
  for (const node of nodes) el.append(node)
  return el
}

/** 组件渲染入口：函数组件直接调用，标签则创建 DOM 元素。 */
export function jsx(type: unknown, props: Props | null): Node {
  const rest: Props = props ?? {}
  if (type === Fragment) {
    return appendChildren(document.createDocumentFragment(), rest.children)
  }
  if (typeof type === "function") {
    return (type as (p: Props) => Node | null | undefined)(rest) ?? new Comment()
  }
  const el = createElement(String(type))
  setAttributes(el, rest)
  return appendChildren(el, rest.children)
}

/** 静态多子节点版本，与 jsx 行为一致。 */
export function jsxs(type: unknown, props: Props | null, ..._rest: unknown[]): Node {
  return jsx(type, props)
}

/** 开发模式入口（oxc 开启 development 时会调用），忽略调试信息直接渲染。 */
export function jsxDEV(
  type: unknown,
  props: Props | null,
  _key?: unknown,
  _isStaticChildren?: boolean,
  _source?: unknown,
  _self?: unknown,
): Node {
  return jsx(type, props)
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
    interface IntrinsicAttributes {
      key?: string | number | symbol
    }
    type Element = Node
    type ElementType = string | ((props: any) => Node | null | undefined)
    interface ElementChildrenAttribute {
      children: unknown
    }
  }
}
