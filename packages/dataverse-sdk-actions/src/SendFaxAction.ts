import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SendFax action
 */
export interface SendFaxResponse {
  // No content returned
}

/**
 * SendFax action
 *
 * Unbound action
 */
export class SendFaxAction implements Executable<SendFaxResponse> {
  constructor(
    public readonly faxId: string,
    public readonly issueSend: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendFax`;

    const body: Record<string, unknown> = {
      FaxId: this.faxId,
      IssueSend: this.issueSend,
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

  async parseResponse(response: Response): Promise<SendFaxResponse> {
    // No return value (204 No Content)
    return {};
  }
}
