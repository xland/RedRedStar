import { toggleBlockQuote } from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import quoteSvg from "./icon/quote.svg?raw";

export default function QuoteButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isBlockQuote }}
      title="引用"
      onClick={() => run(toggleBlockQuote)}
    >
      <span class="toolIcon" innerHTML={quoteSvg} />
    </button>
  );
}
