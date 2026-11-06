import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSalesCopilotConsentAndInfraStatusResponse as msdyn_GetSalesCopilotConsentAndInfraStatusResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSalesCopilotConsentAndInfraStatusResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetSalesCopilotConsentAndInfraStatus response message
 */
export class msdyn_GetSalesCopilotConsentAndInfraStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesCopilotConsentAndInfraStatusResponseData) {
    super("msdyn_GetSalesCopilotConsentAndInfraStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSalesCopilotConsentAndInfraStatusResponse {
    return new msdyn_GetSalesCopilotConsentAndInfraStatusResponse(
      responseObject<msdyn_GetSalesCopilotConsentAndInfraStatusResponseData>(data)
    );
  }
}
