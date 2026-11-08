import type { RequestInformation } from "./http.js";

export interface Executable<TResponse> {
  toRequestInformation(baseUrl: string): RequestInformation;
  parseResponse(response: Response): Promise<TResponse>;
  /**
   * `true` when `parseResponse` also reads error responses (status 400 or more): `execute()` then
   * passes them to it, instead of rejecting with the error read from the body. A `$batch` needs
   * this: Dataverse answers a batch that stopped at a failed request with that request's status,
   * and the body still holds the responses of the requests that ran (the ExecuteMultiple and
   * ExecuteTransaction messages). Leave it unset otherwise.
   */
  readonly parsesErrorResponses?: boolean;
}
