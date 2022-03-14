import { createInitialState } from "../State";

describe("StateTest", () => {
  test("createInitialState", () => {
    expect(createInitialState()).toMatchObject({
      view: "HOME",
      selectedArticleId: -1,
    });
  });
});
