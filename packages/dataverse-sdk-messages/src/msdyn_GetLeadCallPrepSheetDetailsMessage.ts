import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetLeadCallPrepSheetDetailsResponse as msdyn_GetLeadCallPrepSheetDetailsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetLeadCallPrepSheetDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadCallPrepSheetDetailsRequestParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadCallPrepSheetDetails request message
 *
 * Web API Action: msdyn_GetLeadCallPrepSheetDetails
 */
export class msdyn_GetLeadCallPrepSheetDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadCallPrepSheetDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLeadCallPrepSheetDetailsRequestParameters>;

  constructor(parameters: msdyn_GetLeadCallPrepSheetDetailsRequestParameters) {
    super("msdyn_GetLeadCallPrepSheetDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadCallPrepSheetDetails`;

    const body = requestBody({
      msdyn_leadid: this.Parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadCallPrepSheetDetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetLeadCallPrepSheetDetailsResponse.fromResponse({});
    return msdyn_GetLeadCallPrepSheetDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetLeadCallPrepSheetDetails response message
 */
export class msdyn_GetLeadCallPrepSheetDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadCallPrepSheetDetailsResponseData) {
    super("msdyn_GetLeadCallPrepSheetDetails");
  }

  static fromResponse(data: unknown): msdyn_GetLeadCallPrepSheetDetailsResponse {
    return new msdyn_GetLeadCallPrepSheetDetailsResponse(
      responseObject<msdyn_GetLeadCallPrepSheetDetailsResponseData>(data)
    );
  }
}
