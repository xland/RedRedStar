import { setBackgroundColor } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import fontBackgroundSvg from "./icon/font-background.svg?raw";

export default function BackgroundColorButton() {
  const { format, run } = useToolbar();
  return (
    <label class="toolBtn colorBtn" title="背景高亮">
      <span class="toolIcon" innerHTML={fontBackgroundSvg} />
      <input
        type="color"
        value={format().backgroundColor ?? "#ffff00"}
        onInput={(e) => run((ed) => setBackgroundColor(ed, e.currentTarget.value))}
      />
    </label>
  );
}
