import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetLegalAcceptanceStatusResponse as msdyn_GetLegalAcceptanceStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetLegalAcceptanceStatus request message
 *
 * Web API Action: msdyn_GetLegalAcceptanceStatus
 */
export class msdyn_GetLegalAcceptanceStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLegalAcceptanceStatusResponse>
{
  constructor() {
    super("msdyn_GetLegalAcceptanceStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLegalAcceptanceStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLegalAcceptanceStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetLegalAcceptanceStatusResponse.fromResponse({});
    return msdyn_GetLegalAcceptanceStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetLegalAcceptanceStatus response message
 */
export class msdyn_GetLegalAcceptanceStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLegalAcceptanceStatusResponseData) {
    super("msdyn_GetLegalAcceptanceStatus");
  }

  static fromResponse(data: unknown): msdyn_GetLegalAcceptanceStatusResponse {
    return new msdyn_GetLegalAcceptanceStatusResponse(
      responseObject<msdyn_GetLegalAcceptanceStatusResponseData>(data)
    );
  }
}
