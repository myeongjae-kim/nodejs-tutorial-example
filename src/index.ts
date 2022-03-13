import { createApplicationContext } from "./applicationContext";
import { Constants } from "./Constants";

(async () => {
  const context = createApplicationContext();
  const {
    cliInOut,
    stateManager,
    menuPrinter,
    articleListUseCase,
    articleGetUseCase,
    articleCreateUseCase,
  } = context;

  for (;;) {
    switch (stateManager.getState().view) {
      case "HOME":
        {
          const answer = await cliInOut.printAndGet(menuPrinter.printHome());
          const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);

          if (!possibleAnswers.has(answer)) {
            cliInOut.print(menuPrinter.printWrongInput());
          }

          stateManager.home(answer);
        }
        break;
      case "ARTICLE_LIST":
        {
          const articles = articleListUseCase.findAll();
          const answer = await cliInOut.printAndGet(
            menuPrinter.printArticleList(articles)
          );

          const possibleAnswers = new Set<string>(
            articles.map((it) => it.id + "") + Constants.GO_BACK_COMMAND
          );

          if (!possibleAnswers.has(answer)) {
            cliInOut.print(menuPrinter.printWrongInput());
          }

          stateManager.articleList(answer);
        }
        break;
      case "ARTICLE_DETAIL":
        {
          const article = articleGetUseCase.get(
            stateManager.getState().selectedArticleId
          );
          await cliInOut
            .printAndGet(menuPrinter.printArticleDetail(article))
            .then(stateManager.articleDetail);
        }
        break;
      case "ARTICLE_FORM":
        {
          const title = await cliInOut.printAndGet("제목: ", false);
          const content = await cliInOut.printAndGet("내용: ", false);

          const { id } = articleCreateUseCase.create({
            title,
            content,
          });

          await cliInOut
            .printAndGet(menuPrinter.printArticleSaved(id))
            .then(stateManager.articleCreate);
        }
        break;
      case "EXIT":
        process.exit(0);
    }
  }
})();
