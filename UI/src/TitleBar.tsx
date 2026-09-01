import "./TitleBar.scss";
export default function TitleBar() {
  return (
    <div id="titleBar">
      <div id="titleLabel">这是窗口标题</div>
      <div id="btnBox">
        <div id="minimizeBtn" class="titleBtn">
          <i class="iconfont minimize"></i>
        </div>
        <div id="restoreBtn" class="titleBtn" style="display:none">
          <i class="iconfont restore"></i>
        </div>
        <div id="maximizeBtn" class="titleBtn">
          <i class="iconfont maximize"></i>
        </div>
        <div id="closeBtn" class="titleBtn">
          <i class="iconfont close"></i>
        </div>
      </div>
    </div>
  );
}
