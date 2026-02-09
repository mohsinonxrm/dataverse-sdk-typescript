import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    const data = await response.json();
    return msdyn_GetFeatureControlStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_featureName: this.msdyn_featureName,
    };
  }
}

/**
 * msdyn_GetFeatureControlStatus response message
 */
export class msdyn_GetFeatureControlStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFeatureControlStatusResponse) {
    super("msdyn_GetFeatureControlStatus");
  }

  static fromResponse(data: unknown): msdyn_GetFeatureControlStatusResponse {
    return new msdyn_GetFeatureControlStatusResponse((data as any).value);
  }
}
