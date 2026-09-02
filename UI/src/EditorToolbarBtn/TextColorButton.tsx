import { setTextColor } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import fontColorSvg from "./icon/font-color.svg?raw";

export default function TextColorButton() {
  const { format, run } = useToolbar();
  return (
    <label class="toolBtn colorBtn" title="文字颜色">
      <span class="toolIcon" innerHTML={fontColorSvg} />
      <input
        type="color"
        value={format().textColor ?? "#333333"}
        onInput={(e) => run((ed) => setTextColor(ed, e.currentTarget.value))}
      />
    </label>
  );
}
