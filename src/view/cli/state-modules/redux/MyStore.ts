import { ActionFromReducer, Store } from "redux";
import * as reduxModule from "./redux-module";

export type MyStore = Store<
  reduxModule.State,
  ActionFromReducer<typeof reduxModule.reducer>
>;
