import { toggleSuperscript } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import superscriptSvg from "./icon/superscript.svg?raw";

export default function SuperscriptButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isSuperscript }}
      title="上标"
      onClick={() => run(toggleSuperscript)}
    >
      <span class="toolIcon" innerHTML={superscriptSvg} />
    </button>
  );
}
