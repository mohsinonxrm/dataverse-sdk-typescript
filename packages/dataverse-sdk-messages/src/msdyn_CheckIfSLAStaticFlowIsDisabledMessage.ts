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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfSLAStaticFlowIsDisabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfSLAStaticFlowIsDisabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSLAStaticFlowIsDisabledResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfSLAStaticFlowIsDisabled response message
 *
 * `result` is the value the msdyn_CheckIfSLAStaticFlowIsDisabled action returns (see {@link msdyn_CheckIfSLAStaticFlowIsDisabledResult}).
 */
export class msdyn_CheckIfSLAStaticFlowIsDisabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAStaticFlowIsDisabledResult) {
    super("msdyn_CheckIfSLAStaticFlowIsDisabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfSLAStaticFlowIsDisabledResponse {
    return new msdyn_CheckIfSLAStaticFlowIsDisabledResponse(
      data as msdyn_CheckIfSLAStaticFlowIsDisabledResult
    );
  }
}
