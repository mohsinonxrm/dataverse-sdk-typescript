import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSankeyDataResponse as msdyn_GetSankeyDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSankeyData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyDataRequestParameters {
  msdyn_sequenceid: string;
  msdyn_dateto: string;
  msdyn_datefrom: string;
}

/**
 * msdyn_GetSankeyData request message
 *
 * Web API Action: msdyn_GetSankeyData
 */
export class msdyn_GetSankeyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSankeyDataRequestParameters>;

  constructor(parameters: msdyn_GetSankeyDataRequestParameters) {
    super("msdyn_GetSankeyData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyData`;

    const body = requestBody({
      msdyn_sequenceid: this.Parameters.msdyn_sequenceid,
      msdyn_dateto: this.Parameters.msdyn_dateto,
      msdyn_datefrom: this.Parameters.msdyn_datefrom,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSankeyDataResponse.fromResponse({});
    return msdyn_GetSankeyDataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetSankeyData response message
 */
export class msdyn_GetSankeyDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSankeyDataResponseData) {
    super("msdyn_GetSankeyData");
  }

  static fromResponse(data: unknown): msdyn_GetSankeyDataResponse {
    return new msdyn_GetSankeyDataResponse(responseObject<msdyn_GetSankeyDataResponseData>(data));
  }
}
