import strikethroughSvg from "./icon/strikethrough.svg?raw";
export default function StrikethroughButton() {
  return (
    <button class="toolBtn" title="删除线">
      <span class="toolIcon" innerHTML={strikethroughSvg} />
    </button>
  );
}
