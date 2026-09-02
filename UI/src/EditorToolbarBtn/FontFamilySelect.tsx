import { For } from "solid-js";
import { setFontName } from "roosterjs";
import { useToolbar } from "./ToolbarContext";

/** 编辑器默认字体 */
const DEFAULT_FONT = "微软雅黑";

/** 字体下拉框候选列表 */
const FONT_NAMES = [
  "Arial",
  "Arial Black",
  "Calibri",
  "Cambria",
  "Comic Sans MS",
  "Consolas",
  "Courier New",
  "Georgia",
  "Helvetica",
  "Impact",
  "Segoe UI",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "微软雅黑",
  "宋体",
  "黑体",
  "楷体",
  "仿宋",
];

export default function FontFamilySelect() {
  const { format, run } = useToolbar();
  const font = format();
  const value =
    font.fontName && FONT_NAMES.includes(font.fontName)
      ? font.fontName
      : DEFAULT_FONT;
  return (
    <select
      class="toolSelect"
      title="字体"
      value={value}
      onChange={(e) => {
        const v = e.currentTarget.value;
        if (v) run((ed) => setFontName(ed, v));
      }}
    >
      <option value="">{DEFAULT_FONT}</option>
      <For each={FONT_NAMES}>
        {(name) => <option value={name}>{name}</option>}
      </For>
    </select>
  );
}
