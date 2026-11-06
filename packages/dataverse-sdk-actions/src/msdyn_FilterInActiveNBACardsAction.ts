import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FilterInActiveNBACards action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FilterInActiveNBACardsResponse {
  "@odata.context"?: string;
  msdyn_ActiveNBAEntityIds: string;
}

/**
 * Parameters of the msdyn_FilterInActiveNBACards action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FilterInActiveNBACardsActionParameters {
  msdyn_NBAEntityIds: string;
}

/**
 * msdyn_FilterInActiveNBACards action
 *
 * Unbound action
 */
export class msdyn_FilterInActiveNBACardsAction implements Executable<msdyn_FilterInActiveNBACardsResponse> {
  constructor(public readonly parameters: msdyn_FilterInActiveNBACardsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FilterInActiveNBACards`;

    const body = requestBody({
      msdyn_NBAEntityIds: this.parameters.msdyn_NBAEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_FilterInActiveNBACardsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FilterInActiveNBACardsResponse;
  }
}
