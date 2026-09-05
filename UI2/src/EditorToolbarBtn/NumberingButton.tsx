import numberedListSvg from "./icon/numbered-list.svg?raw";
export default function NumberingButton() {
  return (
    <button class="toolBtn" title="有序列表">
      <span class="toolIcon" innerHTML={numberedListSvg} />
    </button>
  );
}
