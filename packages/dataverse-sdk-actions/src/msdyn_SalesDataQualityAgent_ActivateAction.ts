import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesDataQualityAgent_Activate action
 */
export interface msdyn_SalesDataQualityAgent_ActivateResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesDataQualityAgent_ActivateResponse;
    return (await response.json()) as msdyn_SalesDataQualityAgent_ActivateResponse;
  }
}
