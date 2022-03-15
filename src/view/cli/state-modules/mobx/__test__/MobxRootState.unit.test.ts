import { MobxRootState } from "../MobxRootState";

describe("MobxRootStateTest", () => {
  test("construct", () => {
    const mobxRootState = new MobxRootState();

    expect(mobxRootState.view).toBe("HOME");
    expect(mobxRootState.input).toBe("");
  });

  test("setView", () => {
    // given
    const mobxRootState = new MobxRootState({
      view: "ARTICLE_DETAIL",
      input: "what",
    });

    // when
    mobxRootState.setView("HOME");

    // then
    expect(mobxRootState).toMatchObject({
      view: "HOME",
      input: "",
    });
  });

  test("setInput", () => {
    // given
    const mobxRootState = new MobxRootState({
      view: "ARTICLE_DETAIL",
      input: "what",
    });

    // when
    mobxRootState.setInput("updated input");

    // then
    expect(mobxRootState).toMatchObject({
      view: "ARTICLE_DETAIL",
      input: "updated input",
    });
  });
});
