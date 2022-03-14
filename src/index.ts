import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { createApplicationContext } from "./applicationContext";

const context = createApplicationContext();

const application = new ApplicationByStateManager(
  context.stateManager,
  context.cliController
);
application.run();

/*
const application = new ApplicationByRedux(
  context.store,
  context.cliController
);
application.run();
*/
