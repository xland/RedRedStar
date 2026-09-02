import { For } from "solid-js";
import { setFontSize } from "roosterjs";
import { useToolbar } from "./ToolbarContext";

const DEFAULT_FONT_SIZE = "15pt";

/** 字号下拉框候选列表 */
const FONT_SIZES = [
  "9pt",
  "10pt",
  "11pt",
  "12pt",
  "14pt",
  "15pt",
  "16pt",
  "18pt",
  "20pt",
  "24pt",
  "28pt",
  "32pt",
  "36pt",
  "48pt",
  "60pt",
  "72pt",
];

export default function FontSizeSelect() {
  const { format, run } = useToolbar();
  const font = format();
  const value =
    font.fontSize && FONT_SIZES.includes(font.fontSize)
      ? font.fontSize
      : DEFAULT_FONT_SIZE;
  return (
    <select
      class="toolSelect"
      title="字号"
      value={value}
      onChange={(e) => {
        const v = e.currentTarget.value;
        if (v) run((ed) => setFontSize(ed, v));
      }}
    >
      <option value="">{DEFAULT_FONT_SIZE}</option>
      <For each={FONT_SIZES}>
        {(size) => <option value={size}>{size}</option>}
      </For>
    </select>
  );
}
