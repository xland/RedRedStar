import type {
  IEditor,
  ShallowMutableContentModelParagraph,
} from "roosterjs";
import { useToolbar } from "./ToolbarContext";
import codeBlockSvg from "./icon/code-block.svg?raw";

const CODE_FONT = "Consolas, monospace";
const CODE_BG = "#f6f8fa";

/** 对选中的段落整体切换代码块样式（等宽字体 + 灰底） */
function toggleCodeBlock(editor: IEditor) {
  editor.focus();
  editor.formatContentModel((model) => {
    let changed = false;
    model.blocks.forEach((block) => {
      if (block.blockType !== "Paragraph") return;
      const paragraph = block as ShallowMutableContentModelParagraph;
      const segments = paragraph.segments;
      const isCodeBlock =
        segments.length > 0 && segments.every((seg) => !!seg.code);
      segments.forEach((seg) => {
        if (seg.code) {
          if (isCodeBlock) delete seg.code;
        } else {
          seg.code = { format: { fontFamily: CODE_FONT } };
        }
      });
      if (isCodeBlock) {
        if (paragraph.format) delete paragraph.format.backgroundColor;
      } else {
        paragraph.format = { ...paragraph.format, backgroundColor: CODE_BG };
      }
      changed = true;
    });
    return changed;
  });
}

export default function CodeBlockButton() {
  const { format, run } = useToolbar();
  return (
    <button
      class={{ toolBtn: true, active: !!format().isCodeBlock }}
      title="代码块"
      onClick={() => run(toggleCodeBlock)}
    >
      <span class="toolIcon" innerHTML={codeBlockSvg} />
    </button>
  );
}
