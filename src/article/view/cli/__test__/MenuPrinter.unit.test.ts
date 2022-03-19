import { ArticleResponseFixture } from "../../../application/port/incoming/__test__/ArticleResponseFixture";
import { ArticlePrinter } from "../ArticlePrinter";
import { MenuPrinter } from "../MenuPrinter";

describe("MenuPrinterTest", () => {
  const menuPrinter = new MenuPrinter(new ArticlePrinter());

  test("printHome", () => {
    expect(menuPrinter.printHome()).toBe(`1) 목록 조회
2) 쓰기
x) 종료

선택: `);
  });

  test("printArticleList", () => {
    const articles = [
      ArticleResponseFixture.create(1),
      ArticleResponseFixture.create(2),
    ];
    expect(menuPrinter.printArticleList(articles)).toBe(`\
1) ${articles[0].title}
2) ${articles[1].title}
x) 뒤로가기

선택: `);
  });

  test("printArticleList_empty", () => {
    expect(menuPrinter.printArticleList([])).toBe(`\
x) 뒤로가기

선택: `);
  });

  test("printArticleDetail_empty", () => {
    const article = ArticleResponseFixture.create();
    expect(menuPrinter.printArticleDetail(article)).toBe(`\
제목: ${article.title}
내용: ${article.content}

엔터 키를 누르면 이전 화면으로 되돌아갑니다.`);
  });

  test("printArticleSaved", () => {
    const id = 1;

    expect(menuPrinter.printArticleSaved(id)).toBe(`
게시글을 저장했습니다. id: ${id}

엔터 키를 누르면 이전 화면으로 되돌아갑니다.`);
  });

  test("printWrongInput", () => {
    expect(menuPrinter.printWrongInput()).toBe(
      "입력이 올바르지 않습니다. 아래 선택지의 맨 앞 문자를 입력해주세요.\n\n"
    );
  });
});
