import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CaseClassification action
 */
export interface msdyn_CaseClassificationResponse {
  Response4: string;
}

/**
 * msdyn_CaseClassification action
 *
 * Unbound action
 */
export class msdyn_CaseClassificationAction implements Executable<msdyn_CaseClassificationResponse> {
  constructor(public readonly cSCopilotRequest4: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseClassification`;

    const body: Record<string, unknown> = {
      CSCopilotRequest4: this.cSCopilotRequest4,
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

  async parseResponse(response: Response): Promise<msdyn_CaseClassificationResponse> {
    const data = await response.json();
    return data as msdyn_CaseClassificationResponse;
  }
}
