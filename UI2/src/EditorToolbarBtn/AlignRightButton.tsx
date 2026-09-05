import alignRightSvg from "./icon/align-right.svg?raw";
export default function AlignRightButton() {
  return (
    <button class="toolBtn" title="右对齐">
      <span class="toolIcon" innerHTML={alignRightSvg} />
    </button>
  );
}
