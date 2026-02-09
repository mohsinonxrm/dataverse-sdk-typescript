import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CreateAndSendNewEmail action
 */
export interface CreateAndSendNewEmailResponse {
  EmailId: string;
}

/**
 * CreateAndSendNewEmail action
 *
 * Unbound action
 */
export class CreateAndSendNewEmailAction implements Executable<CreateAndSendNewEmailResponse> {
  constructor(
    public readonly subject: string,
    public readonly body: string,
    public readonly from: string,
    public readonly to: string,
    public readonly cc: string,
    public readonly bcc: string,
    public readonly regarding: EntityReference,
    public readonly importance: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAndSendNewEmail`;

    const body: Record<string, unknown> = {
      Subject: this.subject,
      Body: this.body,
      From: this.from,
      To: this.to,
      Cc: this.cc,
      Bcc: this.bcc,
      Regarding: this.regarding,
      Importance: this.importance,
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

  async parseResponse(response: Response): Promise<CreateAndSendNewEmailResponse> {
    const data = await response.json();
    return data as CreateAndSendNewEmailResponse;
  }
}
