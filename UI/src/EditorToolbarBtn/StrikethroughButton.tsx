import { toggleStrikethrough } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import strikethroughSvg from "./icon/strikethrough.svg?raw";

export default function StrikethroughButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isStrikeThrough }}
      title="删除线"
      onClick={() => run(toggleStrikethrough)}
    >
      <span class="toolIcon" innerHTML={strikethroughSvg} />
    </button>
  );
}
