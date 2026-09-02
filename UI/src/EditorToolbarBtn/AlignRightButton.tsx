import { setAlignment } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import alignRightSvg from "./icon/align-right.svg?raw";

export default function AlignRightButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: format().textAlign === "right" }}
      title="右对齐"
      onClick={() => run((ed) => setAlignment(ed, "right"))}
    >
      <span class="toolIcon" innerHTML={alignRightSvg} />
    </button>
  );
}
