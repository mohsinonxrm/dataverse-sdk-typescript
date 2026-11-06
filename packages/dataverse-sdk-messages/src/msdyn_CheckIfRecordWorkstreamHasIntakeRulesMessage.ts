import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfRecordWorkstreamHasIntakeRules request message
 *
 * Web API Action: msdyn_CheckIfRecordWorkstreamHasIntakeRules
 */
export class msdyn_CheckIfRecordWorkstreamHasIntakeRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse>
{
  constructor() {
    super("msdyn_CheckIfRecordWorkstreamHasIntakeRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfRecordWorkstreamHasIntakeRules`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse.fromResponse({});
    return msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfRecordWorkstreamHasIntakeRules response message
 */
export class msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponseData) {
    super("msdyn_CheckIfRecordWorkstreamHasIntakeRules");
  }

  static fromResponse(data: unknown): msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse {
    return new msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse(
      responseObject<msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponseData>(data)
    );
  }
}
