import { Article } from "./Article";

// immutability를 지키기 위해 private 필드와 getter만 선언
export class ArticleImpl implements Article {
  private _id: number;
  private _title: string;
  private _content: string;

  constructor(article: Article) {
    this._id = article.id;
    this._title = article.title;
    this._content = article.content;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public get content() {
    return this._content;
  }
}
