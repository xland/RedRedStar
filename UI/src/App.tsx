import "./App.scss";
import Border from "./Border";
import ContentBox from "./ContentBox";
import TitleBar from "./TitleBar";
import StatusBar from "./StatusBar";
export default function App() {
  return (
    <>
      <TitleBar />
      <ContentBox />
      <StatusBar />
      <Border />
    </>
  );
}
