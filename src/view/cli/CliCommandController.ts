import { ArticleCreateUseCase } from "../../article/application/port/incoming/ArticleCreateUseCase";
import { CliInOut } from "./CliInOut";
import { MenuPrinter } from "./MenuPrinter";

export class CliCommandController {
  constructor(
    private readonly cliInOut: CliInOut,
    private readonly menuPrinter: MenuPrinter,
    private readonly articleCreateUseCase: ArticleCreateUseCase
  ) {}

  public rednerArticleForm = async (): Promise<void> => {
    const title = await this.cliInOut.printAndGet("제목: ", false);
    const content = await this.cliInOut.printAndGet("내용: ", false);

    const { id } = this.articleCreateUseCase.create({
      title,
      content,
    });

    await this.cliInOut.printAndGet(this.menuPrinter.printArticleSaved(id));
  };
}
