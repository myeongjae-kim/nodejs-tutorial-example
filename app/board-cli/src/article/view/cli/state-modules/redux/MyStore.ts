import { ActionFromReducer, Store } from "@reduxjs/toolkit";
import * as reduxModule from "./redux-module";

export type MyStore = Store<
  reduxModule.State,
  ActionFromReducer<typeof reduxModule.reducer>
>;
