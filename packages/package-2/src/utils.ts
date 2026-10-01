import { capitalize } from "lodash-es";

export function formatLabel(text: string): string {
  return capitalize(text);
}
