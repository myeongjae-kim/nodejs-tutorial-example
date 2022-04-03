import { Constants } from "../../../../Constants";
import { ArticleResponse } from "board-domain/dist/article/port/incoming/ArticleResponse";
import { ArticleResponseFixture } from "board-domain/dist/article/port/incoming/__test__/ArticleResponseFixture";
import { ArticlePrinter } from "../ArticlePrinter";

describe("ArticlePrinterTest", () => {
  (
    [
      ["single", [ArticleResponseFixture.create(1)], "1) title"],
      [
        "plural",
        [ArticleResponseFixture.create(1), ArticleResponseFixture.create(2)],
        "1) title" + Constants.LINE_BREAK + "2) title",
      ],
    ] as Array<[string, ArticleResponse[], string]>
  ).forEach(([condition, articles, expected]) => {
    test(`printForList_${condition}`, () => {
      expect(new ArticlePrinter().printForList(...articles)).toBe(expected);
    });
  });

  test("printEach", () => {
    const response = ArticleResponseFixture.create();
    expect(new ArticlePrinter().printEach(response)).toBe(
      "제목: title" + Constants.LINE_BREAK + "내용: content"
    );
  });

  test("printSaved", () => {
    expect(new ArticlePrinter().printSaved(1)).toBe(
      "게시글을 저장했습니다. id: 1"
    );
  });
});
