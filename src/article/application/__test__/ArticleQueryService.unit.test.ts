import { ArticleFixture } from "../../domain/__test__/ArticleFixture";
import { ArticleQueryService } from "../ArticleQueryService";
import { ArticleLoadPort } from "../port/outgoing/ArticleLoadPort";

describe("ArticleQueryServiceTest", () => {
  const article = ArticleFixture.create();
  let articleLoadPort: ArticleLoadPort;
  let articleQueryService: ArticleQueryService;

  beforeEach(() => {
    // ArticleLoadPort가 interface라서 mock대신 stub 사용
    articleLoadPort = {
      findAll: () => [article],
      findById: (id: number) => (id === 1 ? article : undefined),
    };

    articleQueryService = new ArticleQueryService(articleLoadPort);
  });

  test("get", () => {
    const actual = articleQueryService.get(1);

    expect(actual.id).toBe(article.id);
    expect(actual.title).toBe(article.title);
    expect(actual.content).toBe(article.content);
  });

  test("get_nonExistentId_error", () => {
    const nonExistentId = 2;
    expect(() => {
      articleQueryService.get(nonExistentId);
    }).toThrowError("error.article.not-found");
  });

  test("findAll", () => {
    const actual = articleQueryService.findAll();

    expect(actual).toHaveLength(1);
    expect(actual[0].id).toBe(article.id);
    expect(actual[0].title).toBe(article.title);
    expect(actual[0].content).toBe(article.content);
  });
});
