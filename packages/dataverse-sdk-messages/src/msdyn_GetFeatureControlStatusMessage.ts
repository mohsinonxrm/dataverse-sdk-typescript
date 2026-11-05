import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetFeatureControlStatusResponse as msdyn_GetFeatureControlStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetFeatureControlStatus request message
 *
 * Web API Action: msdyn_GetFeatureControlStatus
 */
export class msdyn_GetFeatureControlStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFeatureControlStatusResponse>
{
  constructor(public msdyn_featureName: string) {
    super("msdyn_GetFeatureControlStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureControlStatus`;

    const body: Record<string, unknown> = {
      msdyn_featureName: this.msdyn_featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    const data = await response.json();
    return msdyn_GetFeatureControlStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetFeatureControlStatus response message
 */
export class msdyn_GetFeatureControlStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFeatureControlStatusResponseData) {
    super("msdyn_GetFeatureControlStatus");
  }

  static fromResponse(data: unknown): msdyn_GetFeatureControlStatusResponse {
    return new msdyn_GetFeatureControlStatusResponse(
      responseObject<msdyn_GetFeatureControlStatusResponseData>(data)
    );
  }
}
