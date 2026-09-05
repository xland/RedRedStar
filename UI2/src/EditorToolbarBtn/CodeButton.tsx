import codeSvg from "./icon/code.svg?raw";
export default function CodeButton() {
  return (
    <button class="toolBtn" title="行内代码">
      <span class="toolIcon" innerHTML={codeSvg} />
    </button>
  );
}
