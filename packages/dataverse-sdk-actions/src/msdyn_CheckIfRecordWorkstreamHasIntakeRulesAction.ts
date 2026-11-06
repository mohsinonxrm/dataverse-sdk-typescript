import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfRecordWorkstreamHasIntakeRules action
 */
export interface msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse;
    return (await response.json()) as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse;
  }
}
