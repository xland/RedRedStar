import { createContext, useContext } from "solid-js";
import type { ContentModelFormatState, IEditor } from "roosterjs";

/**
 * 工具栏公共上下文：向各按钮子组件共享编辑器、当前格式状态与统一的执行入口。
 * 相当于按钮组件的公共基类，SolidJS 中使用 Context 而非 class 继承。
 *
 * SolidJS 2.0 中 createContext 返回的 Context 本身就是 Provider 组件，
 * 用法：<ToolbarContext value={...}>...</ToolbarContext>
 */
export interface ToolbarContextValue {
  /** 获取当前编辑器实例 */
  getEditor: () => IEditor | undefined;
  /** 获取（响应式）当前格式状态 */
  format: () => ContentModelFormatState;
  /** 统一执行入口：聚焦编辑器 → 执行动作 → 刷新格式状态 */
  run: (action: (editor: IEditor) => void) => void;
}

export const ToolbarContext = createContext<ToolbarContextValue>();

/** 子组件获取公共上下文的 hook；无 Provider 时 SolidJS 2.0 会直接抛出 ContextNotFoundError */
export function useToolbar(): ToolbarContextValue {
  return useContext(ToolbarContext);
}
