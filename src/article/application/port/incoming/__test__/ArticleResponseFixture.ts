import { ArticleFixture } from "../../../../domain/__test__/ArticleFixture";
import { ArticleResponse, from } from "../ArticleResponse";

export class ArticleResponseFixture {
  public static create = (id = 1): ArticleResponse =>
    from(ArticleFixture.create(id));
}
