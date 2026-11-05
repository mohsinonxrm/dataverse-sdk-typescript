import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_CheckIfSLAStaticFlowIsDisabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfSLAStaticFlowIsDisabled response message
 */
export class msdyn_CheckIfSLAStaticFlowIsDisabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAStaticFlowIsDisabledResponse) {
    super("msdyn_CheckIfSLAStaticFlowIsDisabled");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
    return new msdyn_CheckIfSLAStaticFlowIsDisabledResponse((data as any).value);
  }
}
