import { ApplicationByMobx } from "./ApplicationByMobx";
import { createApplicationContext } from "./applicationContext";

const context = createApplicationContext();

/*
const application = new ApplicationByStateManager(
  context.stateManager,
  context.cliQueryController,
  context.cliCommandController
);
application.run();

const application = new ApplicationByRedux(
  context.store,
  context.cliQueryController,
  context.cliCommandController
);
application.run();
*/

const application = new ApplicationByMobx(
  context.mobxRootState,
  context.cliQueryController,
  context.cliCommandController
);
application.run();
