import quoteSvg from "./icon/quote.svg?raw";
export default function QuoteButton() {
  return (
    <button class="toolBtn" title="引用">
      <span class="toolIcon" innerHTML={quoteSvg} />
    </button>
  );
}
