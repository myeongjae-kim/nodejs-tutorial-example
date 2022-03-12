import { ArticleRequestDto, toEntity } from "../ArticleRequestDto";

describe("ArticleRequestDtoTest", () => {
  test("toEntity", () => {
    // given
    const id = 1;
    const dto: ArticleRequestDto = {
      content: "content",
      title: "title",
    };

    // when
    const entity = toEntity(id, dto);

    // then
    expect(entity).toMatchObject({
      id: id,
      content: dto.content,
      title: dto.title,
    });
  });
});
