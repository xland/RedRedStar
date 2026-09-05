import boldSvg from "./icon/bold.svg?raw";
export default function BoldButton() {
  return (
    <button class="toolBtn" title="加粗 (Ctrl+B)">
      <span class="toolIcon" innerHTML={boldSvg} />
    </button>
  );
}
