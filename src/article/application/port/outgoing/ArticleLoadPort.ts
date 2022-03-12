import { ArticleImpl } from "../../../domain/ArticleImpl";

export interface ArticleLoadPort {
  findAll(): ArticleImpl;
  findById(id: number): ArticleImpl | undefined;
}
