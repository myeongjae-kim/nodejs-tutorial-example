import { Container } from "inversify";

export interface DiConfig {
  decorateClass(): void;
  bind(c: Container): void;
}
