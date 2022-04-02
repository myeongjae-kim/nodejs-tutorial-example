import { Container, decorate, inject, injectable } from "inversify";
import { CliConfig } from "../../common/adapter/CliConfig";
import { DiConfig } from "../../common/adapter/DiConfig";
import { ArticleCommandViewController } from "../view/cli/ArticleCommandViewController";
import { ArticlePrinter } from "../view/cli/ArticlePrinter";
import { ArticleQueryViewController } from "../view/cli/ArticleQueryViewController";
import { MenuPrinter } from "../view/cli/MenuPrinter";
import { ArticleIncomingConfig } from "./ArticleIncomingConfig";

export class ArticleUiConfig implements DiConfig {
  private static SERVICE_ID_PRIVATE = {
    ArticlePrinter: "ArticlePrinter",
    MenuPrinter: "MenuPrinter",
  };

  public static SERVICE_ID = {
    ArticleCommandViewController: "ArticleCommandViewController",
    ArticleQueryViewController: "ArticleQueryViewController",
  };

  public decorateClass(): void {
    decorate(injectable(), ArticlePrinter);

    decorate(injectable(), MenuPrinter);
    decorate(
      inject(ArticleUiConfig.SERVICE_ID_PRIVATE.ArticlePrinter),
      MenuPrinter,
      0
    );

    decorate(injectable(), ArticleCommandViewController);
    decorate(
      inject(CliConfig.SERVICE_ID.CliInOut),
      ArticleCommandViewController,
      0
    );
    decorate(
      inject(ArticleUiConfig.SERVICE_ID_PRIVATE.MenuPrinter),
      ArticleCommandViewController,
      1
    );
    decorate(
      inject(ArticleIncomingConfig.SERVICE_ID.ArticleCreateUseCase),
      ArticleCommandViewController,
      2
    );

    decorate(injectable(), ArticleQueryViewController);
    decorate(
      inject(CliConfig.SERVICE_ID.CliInOut),
      ArticleQueryViewController,
      0
    );
    decorate(
      inject(ArticleUiConfig.SERVICE_ID_PRIVATE.MenuPrinter),
      ArticleQueryViewController,
      1
    );
    decorate(
      inject(ArticleIncomingConfig.SERVICE_ID.ArticleListUseCase),
      ArticleQueryViewController,
      2
    );
    decorate(
      inject(ArticleIncomingConfig.SERVICE_ID.ArticleGetUseCase),
      ArticleQueryViewController,
      3
    );
  }

  public bind(c: Container): void {
    c.bind<ArticlePrinter>(
      ArticleUiConfig.SERVICE_ID_PRIVATE.ArticlePrinter
    ).to(ArticlePrinter);

    c.bind<MenuPrinter>(ArticleUiConfig.SERVICE_ID_PRIVATE.MenuPrinter).to(
      MenuPrinter
    );

    c.bind<ArticleCommandViewController>(
      ArticleUiConfig.SERVICE_ID.ArticleCommandViewController
    ).to(ArticleCommandViewController);

    c.bind<ArticleQueryViewController>(
      ArticleUiConfig.SERVICE_ID.ArticleQueryViewController
    ).to(ArticleQueryViewController);
  }
}
