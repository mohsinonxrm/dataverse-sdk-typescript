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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfRecordWorkstreamHasIntakeRulesResponse;
  }
}
