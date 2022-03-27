/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApplicationByMobx } from "./ApplicationByMobx";
import { ApplicationByRedux } from "./ApplicationByRedux";
import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { createApplicationContext } from "./applicationContext";

const context = createApplicationContext();

const applicationByStateManager = new ApplicationByStateManager(
  context.stateManager,
  context.articleQueryViewController,
  context.articleCommandViewController
);
applicationByStateManager.run();

const applicationByRedux = new ApplicationByRedux(
  context.store,
  context.articleQueryViewController,
  context.articleCommandViewController
);
// applicationByRedux.run();

const applicationByMobx = new ApplicationByMobx(
  context.mobxRootState,
  context.articleQueryViewController,
  context.articleCommandViewController
);
// applicationByMobx.run();
