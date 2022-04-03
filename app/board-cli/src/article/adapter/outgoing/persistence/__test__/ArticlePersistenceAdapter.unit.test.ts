import { ArticleInMemoryRepository } from "../ArticleInMemoryRepository";
import { ArticlePersistenceAdapter } from "../ArticlePersistenceAdapter";
import { mock, when, verify, instance } from "@johanblumenberg/ts-mockito";
import { ArticleFixture } from "board-domain/dist/article/model/__test__/ArticleFixture";

describe("ArticlePersistenceAdapterTest", () => {
  let mockedRepository: ArticleInMemoryRepository;
  let repository: ArticleInMemoryRepository;
  let adapter: ArticlePersistenceAdapter;

  beforeEach(() => {
    mockedRepository = mock(ArticleInMemoryRepository);
    repository = instance(mockedRepository);
    adapter = new ArticlePersistenceAdapter(repository);
  });

  test("findAll", () => {
    // given
    const articles = [ArticleFixture.create()];
    when(mockedRepository.findAll()).thenReturn(articles);

    // when
    const actual = adapter.findAll();

    // then
    expect(actual).toBe(articles);
    verify(mockedRepository.findAll()).once();
  });

  test("findById", () => {
    // given
    const id = 1;
    const article = ArticleFixture.create(id);
    when(mockedRepository.findById(1)).thenReturn(article);

    // when
    const actual = adapter.findById(id);

    // then
    expect(actual).toBe(article);
    verify(mockedRepository.findById(id)).once();
  });

  test("create", () => {
    // given
    const article = ArticleFixture.create();

    // when
    adapter.save(article);

    // then
    verify(mockedRepository.save(article)).once();
  });
});
