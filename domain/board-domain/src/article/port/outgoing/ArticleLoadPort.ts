import { ArticleImpl } from "../../model/ArticleImpl";

export interface ArticleLoadPort {
  findAll(): ArticleImpl[];
  findById(id: number): ArticleImpl | undefined;
}
