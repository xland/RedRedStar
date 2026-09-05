import underlineSvg from "./icon/underline.svg?raw";
export default function UnderlineButton() {
  return (
    <button class="toolBtn" title="下划线 (Ctrl+U)">
      <span class="toolIcon" innerHTML={underlineSvg} />
    </button>
  );
}
