import removeFormatSvg from "./icon/remove-format.svg?raw";
export default function ClearFormatButton() {
  return (
    <button class="toolBtn" title="清除格式">
      <span class="toolIcon" innerHTML={removeFormatSvg} />
    </button>
  );
}
