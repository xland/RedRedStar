import alignCenterSvg from "./icon/align-center.svg?raw";
export default function AlignCenterButton() {
  return (
    <button class="toolBtn" title="居中对齐">
      <span class="toolIcon" innerHTML={alignCenterSvg} />
    </button>
  );
}
