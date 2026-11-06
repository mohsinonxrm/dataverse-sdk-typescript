import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckAlertFieldsResponse as msdyn_CheckAlertFieldsResponseData } from "./types/index.js";

/**
 * msdyn_CheckAlertFields request message
 *
 * Web API Action: msdyn_CheckAlertFields
 */
export class msdyn_CheckAlertFieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckAlertFieldsResponse>
{
  constructor() {
    super("msdyn_CheckAlertFields");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAlertFields`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAlertFieldsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckAlertFieldsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckAlertFields response message
 */
export class msdyn_CheckAlertFieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckAlertFieldsResponseData) {
    super("msdyn_CheckAlertFields");
  }

  static fromResponse(data: unknown): msdyn_CheckAlertFieldsResponse {
    return new msdyn_CheckAlertFieldsResponse(
      responseObject<msdyn_CheckAlertFieldsResponseData>(data)
    );
  }
}
