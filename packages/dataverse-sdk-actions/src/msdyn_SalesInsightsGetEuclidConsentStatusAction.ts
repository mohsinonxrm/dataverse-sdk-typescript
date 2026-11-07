import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesInsightsGetEuclidConsentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusResponse {
  "@odata.context"?: string;
  IsConsentProvided: boolean;
}

/**
 * Parameters of the msdyn_SalesInsightsGetEuclidConsentStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusActionParameters {
  PermissionLevel: string;
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus action
 *
 * Unbound action
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusAction implements Executable<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
  constructor(
    public readonly parameters: msdyn_SalesInsightsGetEuclidConsentStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsGetEuclidConsentStatus`;

    const body = requestBody({
      PermissionLevel: this.parameters.PermissionLevel,
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
  ): Promise<msdyn_SalesInsightsGetEuclidConsentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesInsightsGetEuclidConsentStatusResponse;
  }
}
