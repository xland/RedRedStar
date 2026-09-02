import { redo } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import redoSvg from "./icon/redo.svg?raw";

export default function RedoButton() {
  const { run } = useToolbar();
  return (
    <button class="toolBtn" title="重做 (Ctrl+Y)" onClick={() => run(redo)}>
      <span class="toolIcon" innerHTML={redoSvg} />
    </button>
  );
}
