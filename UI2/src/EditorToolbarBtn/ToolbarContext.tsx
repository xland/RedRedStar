/**
 * 工具栏公共上下文（暂移除）
 *
 * 原实现基于 solid-js 的 createContext / useContext，为各按钮组件提供
 * 编辑器实例、当前格式状态与统一执行入口（参照 UI 工程的同名文件）。
 * UI2 使用自研无框架 JSX 运行时，未安装 solid-js，且各按钮业务逻辑已暂时
 * 移除，因此本文件不再提供运行时实现，仅保留类型约定，待业务逻辑逐个
 * 加回时再补充等价方案。
 */
export interface ToolbarContextValue {
  /** 获取当前编辑器实例 */
  getEditor: () => unknown;
  /** 获取（响应式）当前格式状态 */
  format: () => unknown;
  /** 统一执行入口：聚焦编辑器 → 执行动作 → 刷新格式状态 */
  run: (action: (editor: unknown) => void) => void;
}
