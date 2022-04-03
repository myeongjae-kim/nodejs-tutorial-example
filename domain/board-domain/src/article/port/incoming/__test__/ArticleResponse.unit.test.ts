import { from } from "../ArticleResponse";

describe("ArticleResponseTest", () => {
  test("from", () => {
    // given
    const id = 1;
    const content = "content";
    const title = "title";

    // when
    const response = from({ id, content, title });

    // then
    expect(response).toMatchObject({
      id: id,
      content: content,
      title: title,
    });
  });
});
