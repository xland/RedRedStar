import fontBackgroundSvg from "./icon/font-background.svg?raw";
export default function BackgroundColorButton() {
  return (
    <label class="toolBtn colorBtn" title="背景高亮">
      <span class="toolIcon" innerHTML={fontBackgroundSvg} />
      <input type="color" value="#ffff00" />
    </label>
  );
}
