import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSalesCopilotConsentAndInfraStatus action
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
  msdyn_result: string;
}

/**
 * Parameters of the msdyn_GetSalesCopilotConsentAndInfraStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus action
 *
 * Unbound action
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusAction implements Executable<msdyn_GetSalesCopilotConsentAndInfraStatusResponse> {
  constructor(
    public readonly parameters: msdyn_GetSalesCopilotConsentAndInfraStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotConsentAndInfraStatus`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesCopilotConsentAndInfraStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSalesCopilotConsentAndInfraStatusResponse;
  }
}
