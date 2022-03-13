import { ApplicationByRedux } from "./ApplicationByRedux";
import { createApplicationContext } from "./applicationContext";

(async () => {
  const context = createApplicationContext();
  /*
  const application = new ApplicationByStateManager(
    context.cliInOut,
    context.stateManager,
    context.menuPrinter,
    context.articleListUseCase,
    context.articleGetUseCase,
    context.articleCreateUseCase
  );
  */

  const application = new ApplicationByRedux(
    context.cliInOut,
    context.store,
    context.menuPrinter,
    context.articleListUseCase,
    context.articleGetUseCase,
    context.articleCreateUseCase
  );

  await application.run();
})();
