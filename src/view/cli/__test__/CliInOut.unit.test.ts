import { Interface } from "readline";
import { CliInOut } from "../CliInOut";

describe("CliInOutTest", () => {
  let question: jest.Mock;
  let write: jest.Mock;
  let rl: Interface;
  let cliInOut: CliInOut;

  beforeEach(() => {
    jest.clearAllMocks();

    question = jest.fn();
    write = jest.fn();
    rl = {
      question,
      write,
    } as unknown as Interface;
    cliInOut = new CliInOut(rl);
  });

  test("cliInOut_print", () => {
    // given
    const toPrint = "toPrint";
    cliInOut.print(toPrint);

    expect(write).toBeCalledWith(toPrint);
  });
});
