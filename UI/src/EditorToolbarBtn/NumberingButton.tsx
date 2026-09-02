import { toggleNumbering } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import numberedListSvg from "./icon/numbered-list.svg?raw";

export default function NumberingButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isNumbering }}
      title="有序列表"
      onClick={() => run(toggleNumbering)}
    >
      <span class="toolIcon" innerHTML={numberedListSvg} />
    </button>
  );
}
