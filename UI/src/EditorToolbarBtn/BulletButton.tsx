import { toggleBullet } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import bulletedListSvg from "./icon/bulleted-list.svg?raw";

export default function BulletButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isBullet }}
      title="无序列表"
      onClick={() => run(toggleBullet)}
    >
      <span class="toolIcon" innerHTML={bulletedListSvg} />
    </button>
  );
}
