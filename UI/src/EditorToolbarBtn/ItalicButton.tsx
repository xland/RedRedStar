import { toggleItalic } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import italicSvg from "./icon/italic.svg?raw";

export default function ItalicButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isItalic }}
      title="斜体 (Ctrl+I)"
      onClick={() => run(toggleItalic)}
    >
      <span class="toolIcon" innerHTML={italicSvg} />
    </button>
  );
}
