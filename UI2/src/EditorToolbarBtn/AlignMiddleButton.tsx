import alignMiddleSvg from "./icon/align-middle.svg?raw";
export default function AlignMiddleButton() {
  return (
    <button class="toolBtn" title="单元格垂直居中">
      <span class="toolIcon" innerHTML={alignMiddleSvg} />
    </button>
  );
}
