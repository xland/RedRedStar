import alignJustifySvg from "./icon/align-justify.svg?raw";
export default function AlignJustifyButton() {
  return (
    <button class="toolBtn" title="两端对齐">
      <span class="toolIcon" innerHTML={alignJustifySvg} />
    </button>
  );
}
