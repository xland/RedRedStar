import linkSvg from "./icon/link.svg?raw";
export default function LinkButton() {
  return (
    <button class="toolBtn" title="插入链接">
      <span class="toolIcon" innerHTML={linkSvg} />
    </button>
  );
}
