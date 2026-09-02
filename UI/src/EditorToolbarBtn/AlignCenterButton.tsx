import { setAlignment } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import alignCenterSvg from "./icon/align-center.svg?raw";

export default function AlignCenterButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: format().textAlign === "center" }}
      title="居中对齐"
      onClick={() => run((ed) => setAlignment(ed, "center"))}
    >
      <span class="toolIcon" innerHTML={alignCenterSvg} />
    </button>
  );
}
