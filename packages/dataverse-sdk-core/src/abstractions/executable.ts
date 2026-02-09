import type { RequestInformation } from "./http.js";

export interface Executable<TResponse> {
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<TResponse>;
}
