import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ResetUserFilters action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ResetUserFiltersResponse = void;

/**
 * Parameters of the ResetUserFilters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ResetUserFiltersActionParameters {
  QueryType: number;
}

/**
 * ResetUserFilters action
 *
 * Unbound action
 */
export class ResetUserFiltersAction implements Executable<ResetUserFiltersResponse> {
  constructor(public readonly parameters: ResetUserFiltersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ResetUserFilters`;

    const body = requestBody({
      QueryType: this.parameters.QueryType,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  parseResponse(_response: Response): Promise<ResetUserFiltersResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
