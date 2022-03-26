/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationByMobx } from "./ApplicationByMobx";
import { ApplicationByRedux } from "./ApplicationByRedux";
import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { createApplicationContext } from "./applicationContext";

const context = createApplicationContext();

const applicationByStateManager = new ApplicationByStateManager(
  context.stateManager,
  context.cliQueryController,
  context.cliCommandController
);
applicationByStateManager.run();

const applicationByRedux = new ApplicationByRedux(
  context.store,
  context.cliQueryController,
  context.cliCommandController
);
// applicationByRedux.run();

const applicationByMobx = new ApplicationByMobx(
  context.mobxRootState,
  context.cliQueryController,
  context.cliCommandController
);
// applicationByMobx.run();
