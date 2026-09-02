import { setAlignment } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import alignJustifySvg from "./icon/align-justify.svg?raw";

export default function AlignJustifyButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: format().textAlign === "justify" }}
      title="两端对齐"
      onClick={() => run((ed) => setAlignment(ed, "justify"))}
    >
      <span class="toolIcon" innerHTML={alignJustifySvg} />
    </button>
  );
}
