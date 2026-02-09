import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_processsentimentresponse action
 */
export interface msdyn_processsentimentresponseResponse {
  sentimentResponse: string;
}

/**
 * msdyn_processsentimentresponse action
 *
 * Unbound action
 */
export class msdyn_processsentimentresponseAction implements Executable<msdyn_processsentimentresponseResponse> {
  constructor(
    public readonly emailId: string,
    public readonly copilotResponse: string[],
    public readonly conversationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_processsentimentresponse`;

    const body: Record<string, unknown> = {
      emailId: this.emailId,
      copilotResponse: this.copilotResponse,
      conversationId: this.conversationId,
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

  async parseResponse(response: Response): Promise<msdyn_processsentimentresponseResponse> {
    const data = await response.json();
    return data as msdyn_processsentimentresponseResponse;
  }
}
