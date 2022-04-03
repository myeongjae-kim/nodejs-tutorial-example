import { ArticleImpl } from "../ArticleImpl";

describe("ArticleTest", () => {
  test("construct", () => {
    // given
    const id = 1;
    const title = "title";
    const content = "content";

    // when
    const article = new ArticleImpl({
      id,
      title,
      content,
    });

    // then
    expect(article.id).toBe(id);
    expect(article.title).toBe(title);
    expect(article.content).toBe(content);
  });
});
