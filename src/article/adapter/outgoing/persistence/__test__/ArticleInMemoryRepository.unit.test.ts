import { ArticleImpl } from "../../../../domain/ArticleImpl";
import { ArticleFixture } from "../../../../domain/__test__/ArticleFixture";
import { ArticleInMemoryRepository } from "../ArticleInMemoryRepository";

describe("ArticleInMemoryRepositoryTest", () => {
  let records: Record<string, ArticleImpl>;
  let repository: ArticleInMemoryRepository;

  beforeEach(() => {
    records = {};
    repository = new ArticleInMemoryRepository(records);
  });

  test("save", () => {
    // given
    const articleImpl = ArticleFixture.create();

    // when
    repository.save(articleImpl);

    // then
    expect(records[articleImpl.id]).toBe(articleImpl);
  });

  test("findById", () => {
    // given
    const articleImpl = ArticleFixture.create();
    records[articleImpl.id] = articleImpl;

    // when
    const entity = repository.findById(1);

    // then
    expect(entity).not.toBeUndefined();
  });

  test("findById_nonExistentId_undefined", () => {
    expect(repository.findById(999)).toBeUndefined();
  });

  test("findAll", () => {
    // given
    records[1] = ArticleFixture.create(1);
    records[2] = ArticleFixture.create(2);

    // when
    const entities = repository.findAll();

    // then
    expect(entities).toHaveLength(2);
  });
});
