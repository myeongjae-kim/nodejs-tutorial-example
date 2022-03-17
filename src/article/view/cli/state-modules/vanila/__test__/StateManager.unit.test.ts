import { Constants } from "../../../../../../Constants";
import { State } from "../../State";
import { View } from "../../View";
import { StateManager } from "../StateManager";

describe("StateManagerTest", () => {
  let stateManager: StateManager;

  beforeEach(() => {
    stateManager = new StateManager();
  });

  (
    [
      ["articleList", "1", "ARTICLE_LIST"],
      ["articleForm", "2", "ARTICLE_FORM"],
      ["exit", "x", "EXIT"],
    ] as Array<[string, string, View]>
  ).forEach(([condition, answer, expectedView]) => {
    test(`home_${condition}`, () => {
      stateManager.home(answer);
      expect(stateManager.getState().view).toBe(expectedView);
    });
  });

  (
    [
      ["empty", "", { view: "ARTICLE_LIST", selectedArticleId: -1 }],
      [
        "goBack",
        Constants.GO_BACK_COMMAND,
        { view: "HOME", selectedArticleId: -1 },
      ],
      ["articleDetail", "1", { view: "ARTICLE_DETAIL", selectedArticleId: 1 }],
    ] as Array<[string, string, State]>
  ).forEach(([condition, answer, expectedState]) => {
    test(`articleList_${condition}`, () => {
      stateManager = new StateManager({
        view: "ARTICLE_LIST",
        selectedArticleId: -1,
      });

      stateManager.articleList(answer);
      expect(stateManager.getState()).toMatchObject(expectedState);
    });
  });

  test("articleDetail", () => {
    stateManager.articleDetail();

    expect(stateManager.getState()).toMatchObject({
      view: "ARTICLE_LIST",
      selectedArticleId: -1,
    });
  });

  test("articleCreate", () => {
    stateManager.articleCreate();

    expect(stateManager.getState()).toMatchObject({
      view: "HOME",
      selectedArticleId: -1,
    });
  });
});
