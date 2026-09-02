import { toggleSubscript } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import subscriptSvg from "./icon/subscript.svg?raw";

export default function SubscriptButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isSubscript }}
      title="下标"
      onClick={() => run(toggleSubscript)}
    >
      <span class="toolIcon" innerHTML={subscriptSvg} />
    </button>
  );
}
