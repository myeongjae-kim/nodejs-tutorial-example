import readline from "readline";
import { createApplicationContext } from "./applicationContext";
import { ArticleCreateUseCase } from "./article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "./article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "./article/application/port/incoming/ArticleListUseCase";
import { Constants } from "./Constants";
import { MenuPrinter } from "./view/cli/MenuPrinter";

// TODO: 아래 내용을 좀 더 간결하게 써보자.. 고전적인 유한 상태 머신 패턴인데 좋은 방법 없나.
type State =
  | "HOME"
  | "ARTICLE_LIST"
  | "ARTICLE_DETAIL"
  | "ARTICLE_FORM"
  | "EXIT";
let state: State = "HOME";
let selectedArticleId = -1;

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

// home
async function home() {
  const answer = await printAndGet(menuPrinter.printHome());

  const possibleAnswers: Set<string> = new Set(["1", "2", "x"]);
  if (!possibleAnswers.has(answer)) {
    print(menuPrinter.printWrongInput());
    return;
  }

  switch (answer) {
    case "1":
      state = "ARTICLE_LIST";
      break;
    case "2":
      state = "ARTICLE_FORM";
      break;
    case "x":
      state = "EXIT";
      break;
  }
}

// articleList
async function articleList(articleListUseCase: ArticleListUseCase) {
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
      state = "HOME";
      break;
    default:
      state = "ARTICLE_DETAIL";
      selectedArticleId = parseInt(answer);
      break;
  }
}

// articleDetail
async function articleDetail(articleGetUseCase: ArticleGetUseCase) {
  const article = articleGetUseCase.get(selectedArticleId);
  await printAndGet(menuPrinter.printArticleDetail(article));

  state = "ARTICLE_LIST";
  selectedArticleId = -1;
}

// articleCreate
async function articleCreate(articleCreateUseCase: ArticleCreateUseCase) {
  const title = await printAndGet("제목: ", false);
  const content = await printAndGet("내용: ", false);

  const { id } = articleCreateUseCase.create({
    title,
    content,
  });

  await printAndGet(menuPrinter.printArticleSaved(id));

  state = "HOME";
  selectedArticleId = -1;
}

const main = async () => {
  console.clear();
  const context = createApplicationContext();

  for (;;) {
    switch (state) {
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
};

main();
