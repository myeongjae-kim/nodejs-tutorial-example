import { ArticleImpl } from "../../domain/ArticleImpl";
import { ArticleCommandService } from "../ArticleCommandService";
import { ArticleRequest } from "../port/incoming/ArticleRequest";

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
    const articleRequest: ArticleRequest = {
      title: "title",
      content: "content",
    };

    expect(articleCommandService.create(articleRequest).id).toBe(1);
    expect(saved).toHaveLength(1);

    expect(articleCommandService.create(articleRequest).id).toBe(2);
    expect(saved).toHaveLength(2);
  });
});
