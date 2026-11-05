import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_emailsentimentflowaction action
 */
export interface msdyn_emailsentimentflowactionResponse {
  emailSentimentResponse: string;
}

/**
 * msdyn_emailsentimentflowaction action
 *
 * Unbound action
 */
export class msdyn_emailsentimentflowactionAction implements Executable<msdyn_emailsentimentflowactionResponse> {
  constructor(public readonly emailId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailsentimentflowaction`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_emailsentimentflowactionResponse> {
    const data = await response.json();
    return data as msdyn_emailsentimentflowactionResponse;
  }
}
