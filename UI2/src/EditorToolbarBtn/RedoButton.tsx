import redoSvg from "./icon/redo.svg?raw";
export default function RedoButton() {
  return (
    <button class="toolBtn" title="重做 (Ctrl+Y)">
      <span class="toolIcon" innerHTML={redoSvg} />
    </button>
  );
}
