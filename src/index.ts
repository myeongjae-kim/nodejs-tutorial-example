import { createApplicationContext } from "./applicationContext";
import {
  articleCreate,
  articleDetail,
  articleList,
  getState,
  home,
} from "./view/cli/finite-state-machine";

(async () => {
  console.clear();
  const context = createApplicationContext();

  for (;;) {
    switch (getState()) {
      case "HOME":
        await home();
        break;
      case "ARTICLE_LIST":
        await articleList(context.articleListUseCase);
        break;
      case "ARTICLE_DETAIL":
        await articleDetail(context.articleGetUseCase);
        break;
      case "ARTICLE_FORM":
        await articleCreate(context.articleCreateUseCase);
        break;
      case "EXIT":
        process.exit(0);
    }
  }
})();
