import alignLeftSvg from "./icon/align-left.svg?raw";
export default function AlignLeftButton() {
  return (
    <button class="toolBtn" title="左对齐">
      <span class="toolIcon" innerHTML={alignLeftSvg} />
    </button>
  );
}
