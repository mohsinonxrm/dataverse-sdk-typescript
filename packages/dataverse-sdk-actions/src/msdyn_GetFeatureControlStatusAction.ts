import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetFeatureControlStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFeatureControlStatusResponse {
  "@odata.context"?: string;
  msdyn_isFeatureEnabled: boolean;
}

/**
 * Parameters of the msdyn_GetFeatureControlStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFeatureControlStatusActionParameters {
  msdyn_featureName: string;
}

/**
 * msdyn_GetFeatureControlStatus action
 *
 * Unbound action
 */
export class msdyn_GetFeatureControlStatusAction implements Executable<msdyn_GetFeatureControlStatusResponse> {
  constructor(public readonly parameters: msdyn_GetFeatureControlStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureControlStatus`;

    const body = requestBody({
      msdyn_featureName: this.parameters.msdyn_featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetFeatureControlStatusResponse;
  }
}
