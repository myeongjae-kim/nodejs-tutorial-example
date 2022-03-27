import { Container, decorate, inject, injectable } from "inversify";
import { DiConfig } from "../../common/adapter/DiConfig";
import { ArticleCommandService } from "../application/ArticleCommandService";
import { ArticleQueryService } from "../application/ArticleQueryService";
import { ArticleCreateUseCase } from "../application/port/incoming/ArticleCreateUseCase";
import { ArticleGetUseCase } from "../application/port/incoming/ArticleGetUseCase";
import { ArticleListUseCase } from "../application/port/incoming/ArticleListUseCase";
import { ArticleOutgoingConfig } from "./ArticleOutgoingConfig";

export class ArticleIncomingConfig implements DiConfig {
  private static SERVICE_ID_PRIVATE = {
    ArticleCommandService: "ArticleCommandService",
    ArticleQueryService: "ArticleQueryService",
  };

  public static SERVICE_ID = {
    ArticleCreateUseCase: "ArticleCreateUseCase",
    ArticleGetUseCase: "ArticleGetUseCase",
    ArticleListUseCase: "ArticleListUseCase",
  };

  public decorateClass(): void {
    decorate(injectable(), ArticleCommandService);
    decorate(
      inject(ArticleOutgoingConfig.SERVICE_ID.ArticleSavePort),
      ArticleCommandService,
      0
    );

    decorate(injectable(), ArticleQueryService);
    decorate(
      inject(ArticleOutgoingConfig.SERVICE_ID.ArticleLoadPort),
      ArticleQueryService,
      0
    );
  }
  public bind(c: Container): void {
    // private
    c.bind<ArticleCommandService>(
      ArticleIncomingConfig.SERVICE_ID_PRIVATE.ArticleCommandService
    )
      .to(ArticleCommandService)
      .inSingletonScope();

    c.bind<ArticleQueryService>(
      ArticleIncomingConfig.SERVICE_ID_PRIVATE.ArticleQueryService
    )
      .to(ArticleQueryService)
      .inSingletonScope();

    // public
    c.bind<ArticleCreateUseCase>(
      ArticleIncomingConfig.SERVICE_ID.ArticleCreateUseCase
    ).toService(ArticleIncomingConfig.SERVICE_ID_PRIVATE.ArticleCommandService);
    c.bind<ArticleGetUseCase>(
      ArticleIncomingConfig.SERVICE_ID.ArticleGetUseCase
    ).toService(ArticleIncomingConfig.SERVICE_ID_PRIVATE.ArticleQueryService);
    c.bind<ArticleListUseCase>(
      ArticleIncomingConfig.SERVICE_ID.ArticleListUseCase
    ).toService(ArticleIncomingConfig.SERVICE_ID_PRIVATE.ArticleQueryService);
  }
}
