import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ProductDeterminationAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProductDeterminationActionResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_ProductDeterminationAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProductDeterminationActionActionParameters {
  SearchIteration: string;
  RequestPayload: string;
}

/**
 * msdyn_ProductDeterminationAction action
 *
 * Unbound action
 */
export class msdyn_ProductDeterminationActionAction implements Executable<msdyn_ProductDeterminationActionResponse> {
  constructor(public readonly parameters: msdyn_ProductDeterminationActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationAction`;

    const body = requestBody({
      SearchIteration: this.parameters.SearchIteration,
      RequestPayload: this.parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_ProductDeterminationActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ProductDeterminationActionResponse;
  }
}
