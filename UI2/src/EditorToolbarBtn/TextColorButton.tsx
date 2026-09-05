import fontColorSvg from "./icon/font-color.svg?raw";
export default function TextColorButton() {
  return (
    <label class="toolBtn colorBtn" title="文字颜色">
      <span class="toolIcon" innerHTML={fontColorSvg} />
      <input type="color" value="#333333" />
    </label>
  );
}
