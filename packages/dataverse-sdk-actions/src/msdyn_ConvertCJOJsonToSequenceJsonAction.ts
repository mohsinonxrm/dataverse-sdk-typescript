import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConvertCJOJsonToSequenceJson action
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonResponse {
  Result: boolean;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson action
 *
 * Unbound action
 */
export class msdyn_ConvertCJOJsonToSequenceJsonAction implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
  constructor(public readonly sequenceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    const data = await response.json();
    return data as msdyn_ConvertCJOJsonToSequenceJsonResponse;
  }
}
