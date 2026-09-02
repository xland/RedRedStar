import { undo } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import undoSvg from "./icon/undo.svg?raw";

export default function UndoButton() {
  const { run } = useToolbar();
  return (
    <button class="toolBtn" title="撤销 (Ctrl+Z)" onClick={() => run(undo)}>
      <span class="toolIcon" innerHTML={undoSvg} />
    </button>
  );
}
