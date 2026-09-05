import bulletedListSvg from "./icon/bulleted-list.svg?raw";
export default function BulletButton() {
  return (
    <button class="toolBtn" title="无序列表">
      <span class="toolIcon" innerHTML={bulletedListSvg} />
    </button>
  );
}
