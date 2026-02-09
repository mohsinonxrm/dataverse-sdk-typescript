import type { Logger } from "../abstractions/http.js";

export const ConsoleLogger: Logger = {
  debug: (m, meta) => {
    console.debug(m, meta ?? "");
  },
  info: (m, meta) => {
    console.info(m, meta ?? "");
  },
  warn: (m, meta) => {
    console.warn(m, meta ?? "");
  },
  error: (m, meta) => {
    console.error(m, meta ?? "");
  },
};
