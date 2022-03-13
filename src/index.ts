import { createApplicationContext } from "./applicationContext";
import { StateManagerApplication } from "./StateManagerApplication";

(async () => {
  const context = createApplicationContext();
  const application = new StateManagerApplication(
    context.cliInOut,
    context.stateManager,
    context.menuPrinter,
    context.articleListUseCase,
    context.articleGetUseCase,
    context.articleCreateUseCase
  );

  await application.run();
})();
