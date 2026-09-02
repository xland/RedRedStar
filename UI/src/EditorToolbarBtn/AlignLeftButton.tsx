import { setAlignment } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import alignLeftSvg from "./icon/align-left.svg?raw";

export default function AlignLeftButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: format().textAlign === "left" }}
      title="左对齐"
      onClick={() => run((ed) => setAlignment(ed, "left"))}
    >
      <span class="toolIcon" innerHTML={alignLeftSvg} />
    </button>
  );
}
