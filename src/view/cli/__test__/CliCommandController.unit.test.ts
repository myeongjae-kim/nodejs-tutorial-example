import { deepEqual, instance, mock, verify, when } from "ts-mockito";
import { ArticleCreateUseCase } from "../../../article/application/port/incoming/ArticleCreateUseCase";
import { CliCommandController } from "../CliCommandController";
import { CliInOut } from "../CliInOut";
import { MenuPrinter } from "../MenuPrinter";

describe("CliCommandControllerTest", () => {
  let mockedCliInOut: CliInOut;
  let cliInOut: CliInOut;

  let mockedMenuPrinter: MenuPrinter;
  let menuPrinter: MenuPrinter;

  let mockedArticleCreateUseCase: ArticleCreateUseCase;
  let articleCreateUseCase: ArticleCreateUseCase;

  let cliCommandController: CliCommandController;

  beforeEach(() => {
    mockedCliInOut = mock(CliInOut);
    cliInOut = instance(mockedCliInOut);

    mockedMenuPrinter = mock(MenuPrinter);
    menuPrinter = instance(mockedMenuPrinter);

    mockedArticleCreateUseCase = mock<ArticleCreateUseCase>();
    articleCreateUseCase = instance(mockedArticleCreateUseCase);

    cliCommandController = new CliCommandController(
      cliInOut,
      menuPrinter,
      articleCreateUseCase
    );
  });

  test("renderArticleForm", async () => {
    // given
    const title = "title";
    const content = "content";
    when(mockedCliInOut.printAndGet("제목: ", false)).thenResolve(title);
    when(mockedCliInOut.printAndGet("내용: ", false)).thenResolve(content);

    const id = 10;
    when(
      mockedArticleCreateUseCase.create(deepEqual({ title, content }))
    ).thenReturn({
      id,
    });

    const savedMessage = "저장완료";
    when(mockedMenuPrinter.printArticleSaved(id)).thenReturn(savedMessage);
    when(mockedCliInOut.printAndGet(savedMessage)).thenResolve("");

    // when
    await cliCommandController.rednerArticleForm();

    // then
    verify(mockedCliInOut.printAndGet("제목: ", false)).once();
    verify(mockedCliInOut.printAndGet("내용: ", false)).once();
    verify(
      mockedArticleCreateUseCase.create(deepEqual({ title, content }))
    ).once();
    verify(mockedMenuPrinter.printArticleSaved(id)).once();
    verify(mockedCliInOut.printAndGet(savedMessage)).once();
  });
});
