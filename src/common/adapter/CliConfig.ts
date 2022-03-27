import { Container, decorate, inject, injectable } from "inversify";
import readline from "readline";
import { CliInOut } from "../view/cli/CliInOut";
import { DiConfig } from "./DiConfig";

export class CliConfig implements DiConfig {
  private static SERVICE_ID_PRIVATE = {
    readline: "readline",
  };

  public static SERVICE_ID = {
    CliInOut: "CliInOut",
  };

  public decorateClass(): void {
    decorate(injectable(), CliInOut);
    decorate(inject(CliConfig.SERVICE_ID_PRIVATE.readline), CliInOut, 0);
  }

  public bind(c: Container): void {
    c.bind<readline.Interface>(
      CliConfig.SERVICE_ID_PRIVATE.readline
    ).toConstantValue(
      readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
    );

    c.bind<CliInOut>(CliConfig.SERVICE_ID.CliInOut)
      .to(CliInOut)
      .inSingletonScope();
  }
}
