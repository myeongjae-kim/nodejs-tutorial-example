import { Constants } from "../../../../constants";
import { ArticleResponseDto } from "../../../application/port/incoming/ArticleResponseDto";
import { ArticleResponseDtoFixture } from "../../../application/port/incoming/__test__/ArticleResponseDtoFixture";
import { ArticlePrinter } from "../ArticlePrinter";

describe("ArticlePrinterTest", () => {
  (
    [
      ["single", [ArticleResponseDtoFixture.create(1)], "1) title"],
      [
        "plural",
        [
          ArticleResponseDtoFixture.create(1),
          ArticleResponseDtoFixture.create(2),
        ],
        "1) title" + Constants.LINE_BREAK + "2) title",
      ],
    ] as Array<[string, ArticleResponseDto[], string]>
  ).forEach(([condition, articles, expected]) => {
    test(`printForList_${condition}`, () => {
      expect(ArticlePrinter.instance.printForList(...articles)).toBe(expected);
    });
  });

  test("printEach", () => {
    const response = ArticleResponseDtoFixture.create();
    expect(ArticlePrinter.instance.printEach(response)).toBe(
      "제목: title" + Constants.LINE_BREAK + "내용: content"
    );
  });
});
