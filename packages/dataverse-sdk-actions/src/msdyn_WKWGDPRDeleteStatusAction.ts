import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_WKWGDPRDeleteStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_WKWGDPRDeleteStatusResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_WKWGDPRDeleteStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_WKWGDPRDeleteStatusActionParameters {
  UserIds: string[];
}

/**
 * msdyn_WKWGDPRDeleteStatus action
 *
 * Unbound action
 */
export class msdyn_WKWGDPRDeleteStatusAction implements Executable<msdyn_WKWGDPRDeleteStatusResponse> {
  constructor(public readonly parameters: msdyn_WKWGDPRDeleteStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WKWGDPRDeleteStatus`;

    const body = requestBody({
      UserIds: this.parameters.UserIds,
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

  async parseResponse(response: Response): Promise<msdyn_WKWGDPRDeleteStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_WKWGDPRDeleteStatusResponse;
  }
}
