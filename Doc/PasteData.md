知乎

```
(() => {
  const ed = [...document.querySelectorAll('[contenteditable="true"]')]
    .find(el => el.closest('.DraftEditor-root'));
  if (!ed) return console.log('未找到编辑器');
  ed.focus();
  const sel = window.getSelection();
  sel.selectAllChildren(ed);   // 先全选，方便测试后看替换效果
  sel.collapseToEnd();
  const dt = new DataTransfer();
  dt.setData('text/html',
    '<p>test-<strong>加粗</strong>-第一段</p><h2>二级标题</h2><ul><li>列表项</li></ul><blockquote>引用</blockquote>');
  const ev = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(ev, 'clipboardData', { value: dt });
  ed.dispatchEvent(ev);
  console.log('已派发，请观察编辑器内容');
})();
```

微信公众号

```
(() => {
  let ed = document.querySelectorAll('.ProseMirror')[1]; //第0个是标题
  if (!ed) return console.log('未找到编辑器');
  ed.focus();
  const sel = window.getSelection();
  sel.selectAllChildren(ed);   // 先全选，方便测试后看替换效果
  sel.collapseToEnd();
  const dt = new DataTransfer();
  dt.setData('text/html',
    '<p>test-<strong>加粗</strong>-第一段</p><h2>二级标题</h2><ul><li>列表项</li></ul><blockquote>引用</blockquote>');
  const ev = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(ev, 'clipboardData', { value: dt });
  ed.dispatchEvent(ev);
  console.log('已派发，请观察编辑器内容');
})();
```
