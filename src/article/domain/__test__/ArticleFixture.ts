import { ArticleImpl } from "../ArticleImpl";

export class ArticleFixture {
  public static create = (id = 1): ArticleImpl =>
    new ArticleImpl({
      id,
      title: "title",
      content: "content",
    });
}
