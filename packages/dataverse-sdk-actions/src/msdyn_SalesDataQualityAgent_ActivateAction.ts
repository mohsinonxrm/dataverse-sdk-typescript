import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesDataQualityAgent_Activate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ActivateResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_Activate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ActivateActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_Activate action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_ActivateAction implements Executable<msdyn_SalesDataQualityAgent_ActivateResponse> {
  constructor(public readonly parameters: msdyn_SalesDataQualityAgent_ActivateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_Activate`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_SalesDataQualityAgent_ActivateResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesDataQualityAgent_ActivateResponse;
  }
}
