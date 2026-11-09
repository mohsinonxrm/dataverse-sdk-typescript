import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfRecordWorkstreamHasIntakeRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfRecordWorkstreamHasIntakeRules action
 *
 * Unbound action
 */
export class msdyn_CheckIfRecordWorkstreamHasIntakeRulesAction implements Executable<msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse> {
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
    return (await response.json()) as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse;
  }
}
