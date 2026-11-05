import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_AcsForceSyncActionResponse as msdyn_AcsForceSyncActionResponseData } from "./types/index.js";

/**
 * msdyn_AcsForceSyncAction request message
 *
 * Web API Action: msdyn_AcsForceSyncAction
 */
export class msdyn_AcsForceSyncActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AcsForceSyncActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_AcsForceSyncAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    const data = await response.json();
    return msdyn_AcsForceSyncActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_AcsForceSyncAction response message
 */
export class msdyn_AcsForceSyncActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AcsForceSyncActionResponseData) {
    super("msdyn_AcsForceSyncAction");
  }

  static fromResponse(data: unknown): msdyn_AcsForceSyncActionResponse {
    return new msdyn_AcsForceSyncActionResponse(
      responseObject<msdyn_AcsForceSyncActionResponseData>(data)
    );
  }
}
