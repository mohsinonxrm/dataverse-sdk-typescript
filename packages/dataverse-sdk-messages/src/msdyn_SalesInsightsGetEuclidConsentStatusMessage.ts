import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesInsightsGetEuclidConsentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters {
  PermissionLevel: string;
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus request message
 *
 * Web API Action: msdyn_SalesInsightsGetEuclidConsentStatus
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesInsightsGetEuclidConsentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters>;

  constructor(parameters: msdyn_SalesInsightsGetEuclidConsentStatusRequestParameters) {
    super("msdyn_SalesInsightsGetEuclidConsentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsGetEuclidConsentStatus`;

    const body = requestBody({
      PermissionLevel: this.Parameters.PermissionLevel,
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
    return msdyn_SalesInsightsGetEuclidConsentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesInsightsGetEuclidConsentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesInsightsGetEuclidConsentStatusResult {
  "@odata.context"?: string;
  IsConsentProvided: boolean;
}

/**
 * msdyn_SalesInsightsGetEuclidConsentStatus response message
 *
 * `result` is the value the msdyn_SalesInsightsGetEuclidConsentStatus action returns (see {@link msdyn_SalesInsightsGetEuclidConsentStatusResult}).
 */
export class msdyn_SalesInsightsGetEuclidConsentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesInsightsGetEuclidConsentStatusResult) {
    super("msdyn_SalesInsightsGetEuclidConsentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesInsightsGetEuclidConsentStatusResponse {
    return new msdyn_SalesInsightsGetEuclidConsentStatusResponse(
      data as msdyn_SalesInsightsGetEuclidConsentStatusResult
    );
  }
}
