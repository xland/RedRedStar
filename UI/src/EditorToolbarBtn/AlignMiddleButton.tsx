import { editTable } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import alignMiddleSvg from "./icon/align-middle.svg?raw";

export default function AlignMiddleButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class="toolBtn"
      title="单元格垂直居中"
      disabled={!format().isInTable}
      onClick={() => run((ed) => editTable(ed, "alignCellMiddle"))}
    >
      <span class="toolIcon" innerHTML={alignMiddleSvg} />
    </button>
  );
}
