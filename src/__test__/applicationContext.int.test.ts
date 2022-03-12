import { createApplicationContext } from "../applicationContext";
import { ArticleImpl } from "../article/domain/ArticleImpl";
import { ArticleFixture } from "../article/domain/__test__/ArticleFixture";

describe("applicationContextIntegrationTest", () => {
  test("articleCreateUseCase", () => {
    // given
    const records: Record<number, ArticleImpl> = {};
    const context = createApplicationContext(records);

    // when
    context.articleCreateUseCase.create({
      title: "title",
      content: "content",
    });

    // then
    const article = records[1];
    expect(article.id).toBe(1);
    expect(article.title).toBe("title");
    expect(article.content).toBe("content");
  });

  test("articleGetUseCase", () => {
    // given
    const id = 1;
    const article = ArticleFixture.create(id);
    const records: Record<number, ArticleImpl> = { [id]: article };
    const context = createApplicationContext(records);

    // when
    const actual = context.articleGetUseCase.get(id);

    // then
    expect(actual.id).toBe(article.id);
    expect(actual.title).toBe(article.title);
    expect(actual.content).toBe(article.content);
  });

  test("articleListUseCase", () => {
    // given
    const id = 1;
    const article = ArticleFixture.create(id);
    const records: Record<number, ArticleImpl> = { [id]: article };
    const context = createApplicationContext(records);

    // when
    const actual = context.articleListUseCase.findAll();

    // then
    expect(actual).toHaveLength(1);
    expect(actual[0].id).toBe(article.id);
    expect(actual[0].title).toBe(article.title);
    expect(actual[0].content).toBe(article.content);
  });
});
