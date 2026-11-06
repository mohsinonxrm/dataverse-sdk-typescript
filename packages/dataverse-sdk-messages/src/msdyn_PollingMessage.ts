import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PollingResponse as msdyn_PollingResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_Polling message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollingRequestParameters {
  liveWorkItemId: string;
  entityLogicalName: string;
}

/**
 * msdyn_Polling request message
 *
 * Web API Action: msdyn_Polling
 */
export class msdyn_PollingRequest
  extends OrganizationRequest
  implements Executable<msdyn_PollingResponse>
{
  declare readonly Parameters: Readonly<msdyn_PollingRequestParameters>;

  constructor(parameters: msdyn_PollingRequestParameters) {
    super("msdyn_Polling", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_Polling`;

    const body = requestBody({
      liveWorkItemId: this.Parameters.liveWorkItemId,
      entityLogicalName: this.Parameters.entityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_PollingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PollingResponse.fromResponse({});
    return msdyn_PollingResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_Polling response message
 */
export class msdyn_PollingResponse extends OrganizationResponse {
  constructor(public result: msdyn_PollingResponseData) {
    super("msdyn_Polling");
  }

  static fromResponse(data: unknown): msdyn_PollingResponse {
    return new msdyn_PollingResponse(responseObject<msdyn_PollingResponseData>(data));
  }
}
