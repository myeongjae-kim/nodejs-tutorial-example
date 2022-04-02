import { autorun, reaction } from "mobx";
import { View } from "../../View";
import { MobxRootState } from "../MobxRootState";

describe("MobxLearningTest", () => {
  test("autorun", async () => {
    const mobxRootState = new MobxRootState();

    const viewLog: View[] = [];
    const inputLog: string[] = [];

    // autorun은 구독하는 Observable이 하나라도 변경되면 무조건 effect를 발생시킨다.
    // 맨 처음 autorun을 호출할 때도 effect가 발생한다.
    autorun(() => {
      viewLog.push(mobxRootState.view);
      inputLog.push(mobxRootState.input);
    });

    mobxRootState.setView("ARTICLE_DETAIL");
    mobxRootState.setInput("newInput");

    expect(viewLog).toMatchObject(["HOME", "ARTICLE_DETAIL", "ARTICLE_DETAIL"]);
    expect(inputLog).toMatchObject(["", "", "newInput"]);
  });

  test("autorun_separated", async () => {
    const mobxRootState = new MobxRootState();

    const viewLog: View[] = [];
    const inputLog: string[] = [];

    // 기존의 값과 동일한 값이 할당되면 람다를 호출하지 않는다.
    autorun(() => {
      viewLog.push(mobxRootState.view);
    });
    autorun(() => {
      inputLog.push(mobxRootState.input);
    });

    mobxRootState.setView("ARTICLE_DETAIL");
    mobxRootState.setInput("newInput");

    expect(viewLog).toMatchObject(["HOME", "ARTICLE_DETAIL"]);
    // inputLog는 setView()를 호출할 때 ""가 할당되지만, 이전에 동일한 값이 할당되어
    // 있으므로 autorun이 실행되지 않아서 inputLog가 쌓이지 않는다.
    expect(inputLog).toMatchObject(["", "newInput"]);
  });

  test("reaction", async () => {
    const mobxRootState = new MobxRootState();

    const viewLog: View[] = [];
    const inputLog: string[] = [];

    // reaction의 effect는 autorun과 다르게 등록시 실행하지 않는다.
    reaction(
      () => mobxRootState.view,
      (view) => viewLog.push(view)
    );
    reaction(
      () => mobxRootState.input,
      (input) => inputLog.push(input)
    );

    mobxRootState.setView("ARTICLE_DETAIL");
    mobxRootState.setInput("newInput");

    expect(viewLog).toMatchObject(["ARTICLE_DETAIL"]);
    expect(inputLog).toMatchObject(["newInput"]);
  });
});
