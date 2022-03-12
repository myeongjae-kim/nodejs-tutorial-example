import { ArticleImpl } from "../../domain/ArticleImpl";
import { ArticleCommandService } from "../ArticleCommandService";
import { ArticleRequestDto } from "../port/incoming/ArticleRequestDto";

describe("ArticleCommandServiceTest", () => {
  let saved: ArticleImpl[] = [];
  let articleCommandService: ArticleCommandService;

  beforeEach(() => {
    saved = [];
    articleCommandService = new ArticleCommandService({
      save: (article) => saved.push(article),
    });
  });

  test("save", () => {
    // given
    const articleRequestDto: ArticleRequestDto = {
      title: "title",
      content: "content",
    };

    expect(articleCommandService.create(articleRequestDto).id).toBe(1);
    expect(saved).toHaveLength(1);

    expect(articleCommandService.create(articleRequestDto).id).toBe(2);
    expect(saved).toHaveLength(2);
  });
});
