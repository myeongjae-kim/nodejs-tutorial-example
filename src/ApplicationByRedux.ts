import { ActionFromReducer, Store } from "@reduxjs/toolkit";
import { CliController } from "./view/cli/CliController";
import * as reduxModule from "./view/cli/state-modules/redux/redux-module";

export class ApplicationByRedux {
  constructor(
    private readonly store: Store<
      reduxModule.State,
      ActionFromReducer<typeof reduxModule.reducer>
    >,
    private readonly cliController: CliController
  ) {
    // listener 여러개 등록해서 switch case 없애자
    // renderer 분리해서 ApplicationByRedux랑 ApplicationByStateManager의 중복코드 없앨 수 있을듯
    store.subscribe(async () => {
      const { view, input } = store.getState();

      switch (view) {
        case "HOME":
          {
            switch (input) {
              case "":
                this.cliController
                  .renderHome()
                  .then((answer) =>
                    this.store.dispatch(reduxModule.setInput({ input: answer }))
                  );
                break;
              case "1":
                store.dispatch(reduxModule.setView({ view: "ARTICLE_LIST" }));
                break;
              case "2":
                store.dispatch(reduxModule.setView({ view: "ARTICLE_FORM" }));
                break;
              case "x":
                process.exit(0);
            }
          }
          break;
        case "ARTICLE_LIST":
          {
            switch (input) {
              case "":
                this.cliController
                  .renderArticleList()
                  .then((answer) =>
                    this.store.dispatch(reduxModule.setInput({ input: answer }))
                  );
                break;
              case "x":
                store.dispatch(reduxModule.setView({ view: "HOME" }));
                break;
              default:
                this.cliController
                  .renderArticleDetail(parseInt(input))
                  .then(() => {
                    this.store.dispatch(
                      reduxModule.setView({ view: "ARTICLE_LIST" })
                    );
                  });
                break;
            }
          }
          break;
        case "ARTICLE_FORM":
          this.cliController.rednerArticleForm().then(() => {
            this.store.dispatch(reduxModule.setView({ view: "HOME" }));
          });
          break;
        case "EXIT":
          process.exit(0);
      }
    });
  }

  public run = (): void => {
    this.cliController
      .renderHome()
      .then((answer) =>
        this.store.dispatch(reduxModule.setInput({ input: answer }))
      );
  };
}
