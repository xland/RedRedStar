import subscriptSvg from "./icon/subscript.svg?raw";
export default function SubscriptButton() {
  return (
    <button class="toolBtn" title="下标">
      <span class="toolIcon" innerHTML={subscriptSvg} />
    </button>
  );
}
