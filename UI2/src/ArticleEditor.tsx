import "./ArticleEditor.scss";
import type { IEditor } from "roosterjs";
import { Editor } from "roosterjs-content-model-core";
import { WatermarkPlugin } from "roosterjs";
import msg from "./msg";
export default function ArticleEditor() {
  msg.once("ready", () => {
    const contentDiv = document.querySelector<HTMLDivElement>("#articleContent")!;
    const editor = new Editor(contentDiv, {
      plugins: [new WatermarkPlugin("请输入文章内容…")],
      defaultSegmentFormat: {
        fontFamily: "微软雅黑",
        fontSize: "15px",
      },
    });
  });

  return (
    <div id="articleEditor">
      <div id="articleContent"></div>
    </div>
  );
}
