import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_executeemailsentimentbot action
 */
export interface msdyn_executeemailsentimentbotResponse {
  emailSentimentResponse: string;
}

/**
 * msdyn_executeemailsentimentbot action
 *
 * Unbound action
 */
export class msdyn_executeemailsentimentbotAction implements Executable<msdyn_executeemailsentimentbotResponse> {
  constructor(
    public readonly environmentId: string,
    public readonly emailId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_executeemailsentimentbot`;

    const body: Record<string, unknown> = {
      environmentId: this.environmentId,
      emailId: this.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_executeemailsentimentbotResponse> {
    const data = await response.json();
    return data as msdyn_executeemailsentimentbotResponse;
  }
}
