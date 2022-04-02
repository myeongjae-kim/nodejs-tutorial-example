import { ApplicationByStateManager } from "./ApplicationByStateManager";
import { Constants } from "./Constants";
import { initializeContainer } from "./initialize-container";
import { foo } from "board-domain";

const container = initializeContainer();

const applicationByStateManager = container.get<ApplicationByStateManager>(
  Constants.SERVICE_IDS.ApplicationByStateManager
);

foo();
// applicationByStateManager.run();
