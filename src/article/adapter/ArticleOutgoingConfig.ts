import { Container, decorate, inject, injectable } from "inversify";
import { DiConfig } from "../../common/adapter/DiConfig";
import { ArticleLoadPort } from "../application/port/outgoing/ArticleLoadPort";
import { ArticleSavePort } from "../application/port/outgoing/ArticleSavePort";
import { ArticleInMemoryRepository } from "./outgoing/persistence/ArticleInMemoryRepository";
import { ArticlePersistenceAdapter } from "./outgoing/persistence/ArticlePersistenceAdapter";

export class ArticleOutgoingConfig implements DiConfig {
  private static SERVICE_ID_PRIVATE = {
    ArticleInMemoryRepository: "ArticleInMemoryRepository",
    ArticlePersistenceAdapter: "ArticlePersistenceAdapter",
  };
  public static SERVICE_ID = {
    ArticleLoadPort: "ArticleLoadPort",
    ArticleSavePort: "ArticleSavePort",
  };

  public decorateClass(): void {
    decorate(injectable(), ArticleInMemoryRepository);

    decorate(injectable(), ArticlePersistenceAdapter);
    decorate(
      inject(
        ArticleOutgoingConfig.SERVICE_ID_PRIVATE.ArticleInMemoryRepository
      ),
      ArticlePersistenceAdapter,
      0
    );
  }
  public bind(c: Container): void {
    // private
    c.bind<ArticleInMemoryRepository>(
      ArticleOutgoingConfig.SERVICE_ID_PRIVATE.ArticleInMemoryRepository
    )
      .to(ArticleInMemoryRepository)
      .inSingletonScope();

    c.bind<ArticlePersistenceAdapter>(
      ArticleOutgoingConfig.SERVICE_ID_PRIVATE.ArticlePersistenceAdapter
    )
      .to(ArticlePersistenceAdapter)
      .inSingletonScope();

    // public
    c.bind<ArticleLoadPort>(
      ArticleOutgoingConfig.SERVICE_ID.ArticleLoadPort
    ).toService(
      ArticleOutgoingConfig.SERVICE_ID_PRIVATE.ArticlePersistenceAdapter
    );
    c.bind<ArticleSavePort>(
      ArticleOutgoingConfig.SERVICE_ID.ArticleSavePort
    ).toService(
      ArticleOutgoingConfig.SERVICE_ID_PRIVATE.ArticlePersistenceAdapter
    );
  }
}
