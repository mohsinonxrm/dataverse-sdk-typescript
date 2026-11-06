import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSankeyDataResponse as msdyn_GetSankeyDataResponseData } from "./types/index.js";

/**
 * msdyn_GetSankeyData request message
 *
 * Web API Action: msdyn_GetSankeyData
 */
export class msdyn_GetSankeyDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyDataResponse>
{
  constructor(
    public msdyn_sequenceid: string,
    public msdyn_dateto: string,
    public msdyn_datefrom: string
  ) {
    super("msdyn_GetSankeyData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyData`;

    const body: Record<string, unknown> = {
      msdyn_sequenceid: this.msdyn_sequenceid,
      msdyn_dateto: this.msdyn_dateto,
      msdyn_datefrom: this.msdyn_datefrom,
    };

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
    const data = await response.json();
    return msdyn_GetSankeyDataResponse.fromResponse(data);
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
