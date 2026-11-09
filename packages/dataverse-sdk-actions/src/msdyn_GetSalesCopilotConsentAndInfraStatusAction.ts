import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSalesCopilotConsentAndInfraStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSalesCopilotConsentAndInfraStatusResponse;
  }
}
