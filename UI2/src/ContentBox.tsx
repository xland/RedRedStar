import "./ContentBox.scss";
import Category from "./Catetory";
import ArticleTitle from "./ArticleTitle";
import ArticleEditor from "./ArticleEditor";

const SPLITTER_WIDTH = 4; // 与 ContentBox.scss 中 .splitter 宽度一致
const PANEL_MIN_WIDTH: Record<string, number> = {
  category: 100, // Category.scss min-width
  articleTitle: 200, // ArticleTitle.scss min-width
  articleEditor: 200, // ArticleEditor.scss min-width
};

/** 把两个 absolute 定位的 splitter 贴到各自左侧面板右边界并水平居中 */
function updateSplitterPositions() {
  const container = document.getElementById("contentBox");
  const category = document.getElementById("category");
  const articleTitle = document.getElementById("articleTitle");
  const splitter1 = document.querySelector<HTMLElement>(
    "#contentBox .splitter[data-target='category']",
  );
  const splitter2 = document.querySelector<HTMLElement>(
    "#contentBox .splitter[data-target='articleTitle']",
  );
  if (!container || !category || !articleTitle) return;

  const boxLeft = container.getBoundingClientRect().left;
  const half = SPLITTER_WIDTH / 2;
  const catRect = category.getBoundingClientRect();
  const titleRect = articleTitle.getBoundingClientRect();

  if (splitter1) {
    splitter1.style.left = `${catRect.left - boxLeft + catRect.width - half}px`;
  }
  if (splitter2) {
    splitter2.style.left = `${titleRect.left - boxLeft + titleRect.width - half}px`;
  }
}

function startDrag(e: PointerEvent) {
  const splitter = e.currentTarget as HTMLElement;
  const targetId = splitter.dataset.target ?? "";
  const panel = document.getElementById(targetId);
  const container = document.getElementById("contentBox");
  if (!panel || !container) return;

  e.preventDefault();

  const startX = e.clientX;
  const startWidth = panel.getBoundingClientRect().width;
  const containerWidth = container.getBoundingClientRect().width;
  // 被拖面板的最小宽度
  const minWidth = PANEL_MIN_WIDTH[targetId] ?? 80;
  // 其它固定宽度面板的当前宽度：拖拽时不变，会挤压弹性面板（articleEditor）
  let otherFixedWidth = 0;
  for (const id of ["category", "articleTitle"]) {
    if (id === targetId) continue;
    const el = document.getElementById(id);
    if (el) otherFixedWidth += el.getBoundingClientRect().width;
  }
  // 被拖面板的最大宽度 = 容器宽 - 其它固定面板宽度 - 弹性面板最小宽度
  const editorMinWidth = PANEL_MIN_WIDTH.articleEditor ?? 80;
  const maxWidth = Math.max(
    minWidth,
    containerWidth - otherFixedWidth - editorMinWidth,
  );

  function onMove(ev: PointerEvent) {
    const width = Math.min(
      maxWidth,
      Math.max(minWidth, startWidth + ev.clientX - startX),
    );
    panel.style.width = `${width}px`;
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

export default function ContentBox() {
  // 无框架运行时不提供 onSettled，用 rAF 在节点挂载并完成布局后定位一次 splitter
  requestAnimationFrame(updateSplitterPositions);

  return (
    <div id="contentBox">
      <Category />
      <div
        class="splitter"
        data-target="category"
        onPointerDown={startDrag}
      ></div>
      <ArticleTitle />
      <div
        class="splitter"
        data-target="articleTitle"
        onPointerDown={startDrag}
      ></div>
      <ArticleEditor />
    </div>
  );
}
