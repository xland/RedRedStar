import { toggleBold } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import boldSvg from "./icon/bold.svg?raw";

export default function BoldButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isBold }}
      title="加粗 (Ctrl+B)"
      onClick={() => run(toggleBold)}
    >
      <span class="toolIcon" innerHTML={boldSvg} />
    </button>
  );
}
