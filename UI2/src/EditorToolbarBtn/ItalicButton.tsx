import italicSvg from "./icon/italic.svg?raw";
export default function ItalicButton() {
  return (
    <button class="toolBtn" title="斜体 (Ctrl+I)">
      <span class="toolIcon" innerHTML={italicSvg} />
    </button>
  );
}
