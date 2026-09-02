import { removeLink } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import unlinkSvg from "./icon/unlink.svg?raw";

export default function UnlinkButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class="toolBtn"
      title="移除链接"
      disabled={!format().canUnlink}
      onClick={() => run(removeLink)}
    >
      <span class="toolIcon" innerHTML={unlinkSvg} />
    </button>
  );
}
