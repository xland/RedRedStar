import "./ContentBox.scss";
import { onSettled } from "solid-js";
import Category from "./Category";
import TitleList from "./TitleList";
import ArticleEditor from "./ArticleEditor";

const SPLITTER_WIDTH = 5;
const PANEL_MIN_WIDTH: Record<string, number> = {
  category: 100,
  titleList: 200,
  articleEditor: 200,
};

export default function ContentBox() {
  function updateSplitterPositions() {
    const container = document.getElementById("contentBox");
    const category = document.getElementById("category");
    const titleList = document.getElementById("titleList");
    const splitter1 = document.querySelector<HTMLElement>("#contentBox .splitter[data-target='category']");
    const splitter2 = document.querySelector<HTMLElement>("#contentBox .splitter[data-target='titleList']");
    if (!container || !category || !titleList) return;

    const boxLeft = container.getBoundingClientRect().left;
    const half = SPLITTER_WIDTH / 2;
    const catRect = category.getBoundingClientRect();
    const listRect = titleList.getBoundingClientRect();

    // splitter 贴在其左侧面板的右边界并水平居中
    if (splitter1) splitter1.style.left = `${catRect.left - boxLeft + catRect.width - half}px`;
    if (splitter2) splitter2.style.left = `${listRect.left - boxLeft + listRect.width - half}px`;
  }

  function startDrag(e: PointerEvent) {
    const splitter = e.currentTarget as HTMLElement;
    const targetId = splitter.dataset.target ?? "";
    const panel = document.getElementById(targetId);
    const container = document.getElementById("contentBox");
    if (!panel || !container) return;
    const dragPanel: HTMLElement = panel;

    e.preventDefault();

    const startX = e.clientX;
    const startWidth = dragPanel.getBoundingClientRect().width;
    const containerWidth = container.getBoundingClientRect().width;
    // 被拖面板的最小宽度
    const minWidth = PANEL_MIN_WIDTH[targetId] ?? 80;
    // 其它固定宽度面板（category/titleList）的当前宽度：拖拽时不变，会挤压弹性面板
    let otherFixedWidth = 0;
    for (const id of ["category", "titleList"]) {
      if (id === targetId) continue;
      const el = document.getElementById(id);
      if (el) otherFixedWidth += el.getBoundingClientRect().width;
    }
    // 被拖面板的最大宽度 = 容器宽 - 其它固定面板当前宽度 - 弹性面板最小宽度
    const editorMinWidth = PANEL_MIN_WIDTH.articleEditor ?? 80;
    const maxWidth = Math.max(minWidth, containerWidth - otherFixedWidth - editorMinWidth);

    function onMove(ev: PointerEvent) {
      const width = Math.min(
        maxWidth,
        Math.max(minWidth, startWidth + ev.clientX - startX)
      );
      dragPanel.style.width = `${width}px`;
      updateSplitterPositions();
    }

    function onUp() {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.body.classList.remove("splitter-dragging");
    }

    document.body.classList.add("splitter-dragging");
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }

  onSettled(updateSplitterPositions);

  return (
    <div id="contentBox">
      <Category />
      <div class="splitter" data-target="category" onPointerDown={startDrag}></div>
      <TitleList />
      <div class="splitter" data-target="titleList" onPointerDown={startDrag}></div>
      <ArticleEditor />
    </div>
  );
}
