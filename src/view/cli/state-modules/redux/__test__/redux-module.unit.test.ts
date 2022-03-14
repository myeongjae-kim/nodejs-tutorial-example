import { View } from "../../View";
import { reducer, setInput, setView, State } from "../redux-module";

describe("reduxModuleTest", () => {
  test("setInput", () => {
    const state: State = {
      view: "HOME",
      input: "",
    };
    const expectedInput = "input";

    expect(reducer(state, setInput({ input: expectedInput }))).toMatchObject({
      view: "HOME",
      input: expectedInput,
    });
  });

  test("setView", () => {
    const state: State = {
      view: "HOME",
      input: "arbitrary input",
    };
    const expectedView: View = "ARTICLE_DETAIL";

    expect(reducer(state, setView({ view: expectedView }))).toMatchObject({
      view: expectedView,
      input: "",
    });
  });
});
