import readline from "readline";

export class CliInOut {
  constructor(private rl: readline.Interface) {
    console.clear();
  }

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
