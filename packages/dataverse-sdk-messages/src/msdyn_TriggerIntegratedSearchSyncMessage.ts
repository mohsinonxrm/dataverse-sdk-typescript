import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerIntegratedSearchSyncResponse as msdyn_TriggerIntegratedSearchSyncResponseData } from "./types/index.js";

/**
 * msdyn_TriggerIntegratedSearchSync request message
 *
 * Web API Action: msdyn_TriggerIntegratedSearchSync
 */
export class msdyn_TriggerIntegratedSearchSyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerIntegratedSearchSyncResponse>
{
  constructor() {
    super("msdyn_TriggerIntegratedSearchSync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerIntegratedSearchSync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerIntegratedSearchSyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_TriggerIntegratedSearchSyncResponse.fromResponse({});
    return msdyn_TriggerIntegratedSearchSyncResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TriggerIntegratedSearchSync response message
 */
export class msdyn_TriggerIntegratedSearchSyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerIntegratedSearchSyncResponseData) {
    super("msdyn_TriggerIntegratedSearchSync");
  }

  static fromResponse(data: unknown): msdyn_TriggerIntegratedSearchSyncResponse {
    return new msdyn_TriggerIntegratedSearchSyncResponse(
      responseObject<msdyn_TriggerIntegratedSearchSyncResponseData>(data)
    );
  }
}
