import Category from "./Category";
import TitleList from "./TitleList";
import ArticleEditor from "./ArticleEditor";

export default function ContentBox() {
  return (
    <div>
      <Category />
      <TitleList />
      <ArticleEditor />
    </div>
  );
}
