import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfRecordWorkstreamHasIntakeRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfRecordWorkstreamHasIntakeRulesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfRecordWorkstreamHasIntakeRules response message
 *
 * `result` is the value the msdyn_CheckIfRecordWorkstreamHasIntakeRules action returns (see {@link msdyn_CheckIfRecordWorkstreamHasIntakeRulesResult}).
 */
export class msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfRecordWorkstreamHasIntakeRulesResult) {
    super("msdyn_CheckIfRecordWorkstreamHasIntakeRules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse {
    return new msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse(
      data as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResult
    );
  }
}
