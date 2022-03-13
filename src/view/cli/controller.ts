import { MenuPrinter } from "./MenuPrinter";
import readline from "readline";
import { Constants } from "../../Constants";
import { ArticleListUseCase } from "../../article/application/port/incoming/ArticleListUseCase";
import { ArticleGetUseCase } from "../../article/application/port/incoming/ArticleGetUseCase";
import { ArticleCreateUseCase } from "../../article/application/port/incoming/ArticleCreateUseCase";
import { getState, setState } from "./state-modules/state-module-vanila";

console.clear();
const menuPrinter = MenuPrinter.instance;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printAndGet = (toPrint: string, clear = true): Promise<string> =>
  new Promise<string>((resolve) => {
    rl.question(toPrint, (answer) => {
      if (clear) {
        console.clear();
      }
      resolve(answer);
    });
  });

const print = (toPrint: string) => {
  rl.write(toPrint);
};

export async function home() {
  const answer = await printAndGet(menuPrinter.printHome());

  const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);
  if (!possibleAnswers.has(answer)) {
    print(menuPrinter.printWrongInput());
    return;
  }

  switch (answer) {
    case "1":
      setState({ view: "ARTICLE_LIST" });
      break;
    case "2":
      setState({ view: "ARTICLE_FORM" });
      break;
    case "x":
      setState({ view: "EXIT" });
      break;
  }
}

export async function articleList(articleListUseCase: ArticleListUseCase) {
  const articles = articleListUseCase.findAll();
  const answer = await printAndGet(menuPrinter.printArticleList(articles));

  const possibleAnswers = new Set<string>(
    articles.map((it) => it.id + "") + Constants.GO_BACK_COMMAND
  );

  if (!possibleAnswers.has(answer)) {
    print(menuPrinter.printWrongInput());
    return;
  }

  switch (answer) {
    case Constants.GO_BACK_COMMAND:
      setState({ view: "HOME" });
      break;
    default:
      setState({ view: "ARTICLE_DETAIL", selectedArticleId: parseInt(answer) });
      break;
  }
}

export async function articleDetail(articleGetUseCase: ArticleGetUseCase) {
  const article = articleGetUseCase.get(getState().selectedArticleId);
  await printAndGet(menuPrinter.printArticleDetail(article));

  setState({ view: "ARTICLE_LIST", selectedArticleId: -1 });
}

export async function articleCreate(
  articleCreateUseCase: ArticleCreateUseCase
) {
  const title = await printAndGet("제목: ", false);
  const content = await printAndGet("내용: ", false);

  const { id } = articleCreateUseCase.create({
    title,
    content,
  });

  await printAndGet(menuPrinter.printArticleSaved(id));

  setState({ view: "HOME", selectedArticleId: -1 });
}
