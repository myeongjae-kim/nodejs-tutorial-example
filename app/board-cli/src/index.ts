import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { Constants } from "./Constants";
import { initializeContainer } from "./initialize-container";

const container = initializeContainer();

const applicationByStateManager = container.get<ApplicationByStateManager>(
  Constants.SERVICE_IDS.ApplicationByStateManager
);

void applicationByStateManager.run();
