import { toggleCode } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import codeSvg from "./icon/code.svg?raw";

export default function CodeButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isCodeInline }}
      title="行内代码"
      onClick={() => run(toggleCode)}
    >
      <span class="toolIcon" innerHTML={codeSvg} />
    </button>
  );
}
