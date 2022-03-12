import { from } from "../ArticleResponseDto";

describe("ArticleResponseDtoTest", () => {
  test("from", () => {
    // given
    const id = 1;
    const content = "content";
    const title = "title";

    // when
    const responseDto = from({ id, content, title });

    // then
    expect(responseDto).toMatchObject({
      id: id,
      content: content,
      title: title,
    });
  });
});
