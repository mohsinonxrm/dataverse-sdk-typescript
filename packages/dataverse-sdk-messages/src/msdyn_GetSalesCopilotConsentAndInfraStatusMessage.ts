import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetSalesCopilotConsentAndInfraStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus request message
 *
 * Web API Action: msdyn_GetSalesCopilotConsentAndInfraStatus
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesCopilotConsentAndInfraStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesCopilotConsentAndInfraStatusRequestParameters>;

  constructor(parameters: msdyn_GetSalesCopilotConsentAndInfraStatusRequestParameters) {
    super("msdyn_GetSalesCopilotConsentAndInfraStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotConsentAndInfraStatus`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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
    return msdyn_GetSalesCopilotConsentAndInfraStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSalesCopilotConsentAndInfraStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesCopilotConsentAndInfraStatusResult {
  "@odata.context"?: string;
  msdyn_result: string;
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus response message
 *
 * `result` is the value the msdyn_GetSalesCopilotConsentAndInfraStatus action returns (see {@link msdyn_GetSalesCopilotConsentAndInfraStatusResult}).
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesCopilotConsentAndInfraStatusResult) {
    super("msdyn_GetSalesCopilotConsentAndInfraStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
    return new msdyn_GetSalesCopilotConsentAndInfraStatusResponse(
      data as msdyn_GetSalesCopilotConsentAndInfraStatusResult
    );
  }
}
