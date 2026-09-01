import "./ArticleEditor.scss";
import { createSignal, onCleanup, onSettled } from "solid-js";
import { WatermarkPlugin } from "roosterjs";
import { Editor } from "roosterjs-content-model-core";
import type { IEditor } from "roosterjs";
import EditorToolbar from "./EditorToolbar";

const DEFAULT_FONT = "微软雅黑";
const DEFAULT_FONT_SIZE = "15px";

export default function ArticleEditor() {
  let contentDiv: HTMLDivElement | undefined;
  let initialized = false;
  const [getEditor, setEditor] = createSignal<IEditor | undefined>();

  onSettled(() => {
    if (initialized || !contentDiv) return;
    initialized = true;
    const editor = new Editor(contentDiv, {
      plugins: [new WatermarkPlugin("请输入文章内容…")],
      defaultSegmentFormat: {
        fontFamily: DEFAULT_FONT,
        fontSize: DEFAULT_FONT_SIZE,
      },
    });
    setEditor(editor);
  });

  onCleanup(() => {
    getEditor()?.dispose();
  });

  return (
    <div id="articleEditor">
      <EditorToolbar getEditor={getEditor} />
      <div id="articleContent" ref={(el) => (contentDiv = el)}></div>
    </div>
  );
}
