const DEFAULT_FONT = "微软雅黑";

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
  return (
    <select class="toolSelect" title="字体">
      <option value="">{DEFAULT_FONT}</option>
      {FONT_NAMES.map((name) => (
        <option value={name}>{name}</option>
      ))}
    </select>
  );
}
