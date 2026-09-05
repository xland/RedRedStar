import codeBlockSvg from "./icon/code-block.svg?raw";
export default function CodeBlockButton() {
  return (
    <button class="toolBtn" title="代码块">
      <span class="toolIcon" innerHTML={codeBlockSvg} />
    </button>
  );
}
