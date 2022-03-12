import { ArticleFixture } from "../../../../domain/__test__/ArticleFixture";
import { ArticleResponseDto, from } from "../ArticleResponseDto";

export class ArticleResponseDtoFixture {
  public static create = (id = 1): ArticleResponseDto =>
    from(ArticleFixture.create(id));
}
