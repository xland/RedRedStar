import superscriptSvg from "./icon/superscript.svg?raw";
export default function SuperscriptButton() {
  return (
    <button class="toolBtn" title="上标">
      <span class="toolIcon" innerHTML={superscriptSvg} />
    </button>
  );
}
