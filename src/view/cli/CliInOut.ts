import readline from "readline";

export class CliInOut {
  constructor(private rl: readline.Interface) {
    console.clear();
  }

  // 아래 코드는 테스트하기어렵네..
  public printAndGet = (toPrint: string, clear = true): Promise<string> =>
    new Promise<string>((resolve) => {
      this.rl.question(toPrint, (answer) => {
        if (clear) {
          console.clear();
        }
        resolve(answer);
      });
    });

  public print = (toPrint: string) => {
    this.rl.write(toPrint);
  };
}
