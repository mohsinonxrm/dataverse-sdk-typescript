import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ConvertSequenceJsonToCJOJson action
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonResponse {
  Result: boolean;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson action
 *
 * Unbound action
 */
export class msdyn_ConvertSequenceJsonToCJOJsonAction implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
  constructor(public readonly sequenceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    const data = await response.json();
    return data as msdyn_ConvertSequenceJsonToCJOJsonResponse;
  }
}
