import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_SendAHTEvents action
 */
export interface CCaaS_SendAHTEventsResponse {
  Status: string;
  Message: string;
}

/**
 * CCaaS_SendAHTEvents action
 *
 * Unbound action
 */
export class CCaaS_SendAHTEventsAction implements Executable<CCaaS_SendAHTEventsResponse> {
  constructor(
    public readonly apiVersion: string,
    public readonly payload: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendAHTEvents`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      Payload: this.payload,
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

  async parseResponse(response: Response): Promise<CCaaS_SendAHTEventsResponse> {
    const data = await response.json();
    return data as CCaaS_SendAHTEventsResponse;
  }
}
