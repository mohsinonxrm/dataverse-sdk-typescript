import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfSLAStaticFlowIsDisabledResponse as msdyn_CheckIfSLAStaticFlowIsDisabledResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfSLAStaticFlowIsDisabled request message
 *
 * Web API Action: msdyn_CheckIfSLAStaticFlowIsDisabled
 */
export class msdyn_CheckIfSLAStaticFlowIsDisabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSLAStaticFlowIsDisabledResponse>
{
  constructor() {
    super("msdyn_CheckIfSLAStaticFlowIsDisabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAStaticFlowIsDisabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfSLAStaticFlowIsDisabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfSLAStaticFlowIsDisabledResponse.fromResponse({});
    return msdyn_CheckIfSLAStaticFlowIsDisabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfSLAStaticFlowIsDisabled response message
 */
export class msdyn_CheckIfSLAStaticFlowIsDisabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAStaticFlowIsDisabledResponseData) {
    super("msdyn_CheckIfSLAStaticFlowIsDisabled");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
    return new msdyn_CheckIfSLAStaticFlowIsDisabledResponse(
      responseObject<msdyn_CheckIfSLAStaticFlowIsDisabledResponseData>(data)
    );
  }
}
