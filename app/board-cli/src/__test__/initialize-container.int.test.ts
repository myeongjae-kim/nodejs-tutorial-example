import { ArticleIncomingConfig } from "../article/adapter/ArticleIncomingConfig";
import { ArticleCreateUseCase } from "../article/application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "../article/application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "../article/application/port/incoming/ArticleListUseCase";
import { initializeContainer } from "../initialize-container";

describe("containerIntegrationTest", () => {
  test("articleUseCases", () => {
    const container = initializeContainer();
    container
      .get<ArticleCreateUseCase>(
        ArticleIncomingConfig.SERVICE_ID.ArticleCreateUseCase
      )
      .create({
        title: "title",
        content: "content",
      });

    // then
    const article = container
      .get<ArticleGetUseCase>(
        ArticleIncomingConfig.SERVICE_ID.ArticleGetUseCase
      )
      .get(1);
    expect(article.id).toBe(1);
    expect(article.title).toBe("title");
    expect(article.content).toBe("content");

    const articles = container
      .get<ArticleListUseCase>(
        ArticleIncomingConfig.SERVICE_ID.ArticleListUseCase
      )
      .findAll();

    expect(articles).toHaveLength(1);
  });
});
