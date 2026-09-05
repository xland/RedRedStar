import "./ArticleEditor.scss";
import { Editor } from "roosterjs-content-model-core";
import { WatermarkPlugin } from "roosterjs";
import EditorToolbar from "./EditorToolbar";
import msg from "./msg";
export default function ArticleEditor() {
  msg.once("ready", () => {
    const contentDiv = document.querySelector<HTMLDivElement>("#articleContent")!;
    // 编辑器实例暂时不参与业务，先不保存引用；工具栏业务逻辑加回时再把实例提供给按钮
    new Editor(contentDiv, {
      plugins: [new WatermarkPlugin("请输入文章内容…")],
      defaultSegmentFormat: {
        fontFamily: "微软雅黑",
        fontSize: "15px",
      },
    });
  });

  return (
    <div id="articleEditor">
      <EditorToolbar />
      <div id="articleContent"></div>
    </div>
  );
}
