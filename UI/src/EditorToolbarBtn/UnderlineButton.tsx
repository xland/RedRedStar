import { toggleUnderline } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import underlineSvg from "./icon/underline.svg?raw";

export default function UnderlineButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isUnderline }}
      title="下划线 (Ctrl+U)"
      onClick={() => run(toggleUnderline)}
    >
      <span class="toolIcon" innerHTML={underlineSvg} />
    </button>
  );
}
