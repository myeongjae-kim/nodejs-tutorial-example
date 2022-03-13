import { createApplicationContext } from "./applicationContext";
import {
  articleCreate,
  articleDetail,
  articleList,
  home,
} from "./view/cli/controller";
import { getState } from "./view/cli/state-modules/state-module-vanila";

(async () => {
  const context = createApplicationContext();

  for (;;) {
    switch (getState().view) {
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
