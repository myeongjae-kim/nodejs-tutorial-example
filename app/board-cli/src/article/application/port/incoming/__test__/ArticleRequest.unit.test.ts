import { ArticleRequest, toEntity } from "../ArticleRequest";

describe("ArticleRequestTest", () => {
  test("toEntity", () => {
    // given
    const id = 1;
    const request: ArticleRequest = {
      content: "content",
      title: "title",
    };

    // when
    const entity = toEntity(id, request);

    // then
    expect(entity).toMatchObject({
      id: id,
      content: request.content,
      title: request.title,
    });
  });
});
