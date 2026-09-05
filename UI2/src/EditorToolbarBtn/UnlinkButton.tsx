import unlinkSvg from "./icon/unlink.svg?raw";
export default function UnlinkButton() {
  return (
    <button class="toolBtn" title="移除链接">
      <span class="toolIcon" innerHTML={unlinkSvg} />
    </button>
  );
}
