import { clearFormat } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import removeFormatSvg from "./icon/remove-format.svg?raw";

export default function ClearFormatButton() {
  const { run } = useToolbar();
  return (
    <button class="toolBtn" title="清除格式" onClick={() => run(clearFormat)}>
      <span class="toolIcon" innerHTML={removeFormatSvg} />
    </button>
  );
}
