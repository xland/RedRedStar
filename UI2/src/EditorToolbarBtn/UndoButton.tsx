import undoSvg from "./icon/undo.svg?raw";
export default function UndoButton() {
  return (
    <button class="toolBtn" title="撤销 (Ctrl+Z)">
      <span class="toolIcon" innerHTML={undoSvg} />
    </button>
  );
}
