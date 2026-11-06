import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSalesMeetingsResponse as msdyn_GetSalesMeetingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSalesMeetings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSalesMeetingsRequestParameters {
  msdyn_from: string;
  msdyn_to: string;
}

/**
 * msdyn_GetSalesMeetings request message
 *
 * Web API Action: msdyn_GetSalesMeetings
 */
export class msdyn_GetSalesMeetingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesMeetingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSalesMeetingsRequestParameters>;

  constructor(parameters: msdyn_GetSalesMeetingsRequestParameters) {
    super("msdyn_GetSalesMeetings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesMeetings`;

    const body = requestBody({
      msdyn_from: this.Parameters.msdyn_from,
      msdyn_to: this.Parameters.msdyn_to,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesMeetingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSalesMeetingsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSalesMeetings response message
 */
export class msdyn_GetSalesMeetingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesMeetingsResponseData) {
    super("msdyn_GetSalesMeetings");
  }

  static fromResponse(data: unknown): msdyn_GetSalesMeetingsResponse {
    return new msdyn_GetSalesMeetingsResponse(
      responseObject<msdyn_GetSalesMeetingsResponseData>(data)
    );
  }
}
