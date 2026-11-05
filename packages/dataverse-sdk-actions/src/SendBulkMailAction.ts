import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from SendBulkMail action
 */
export interface SendBulkMailResponse {
  // No content returned
}

/**
 * SendBulkMail action
 *
 * Unbound action
 */
export class SendBulkMailAction implements Executable<SendBulkMailResponse> {
  constructor(
    public readonly sender: EntityReference,
    public readonly templateId: string,
    public readonly regardingType: string,
    public readonly regardingId: string,
    public readonly query: TypedQueryBase
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SendBulkMail`;

    const body: Record<string, unknown> = {
      Sender: this.sender,
      TemplateId: this.templateId,
      RegardingType: this.regardingType,
      RegardingId: this.regardingId,
      Query: this.query,
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

  async parseResponse(response: Response): Promise<SendBulkMailResponse> {
    // No return value (204 No Content)
    return {};
  }
}
