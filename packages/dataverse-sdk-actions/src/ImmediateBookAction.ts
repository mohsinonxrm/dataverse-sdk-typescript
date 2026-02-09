import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { BusinessNotification, ValidationResult } from "./types/index.js";

/**
 * Response from ImmediateBook action
 */
export interface ImmediateBookResponse {
  ValidationResult: ValidationResult;
  Notifications: BusinessNotification[];
}

/**
 * ImmediateBook action
 *
 * Unbound action
 */
export class ImmediateBookAction implements Executable<ImmediateBookResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly attachmentIds: string[],
    public readonly eWSUrl: string,
    public readonly attachmentToken: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImmediateBook`;

    const body: Record<string, unknown> = {
      Target: this.target,
      AttachmentIds: this.attachmentIds,
      EWSUrl: this.eWSUrl,
      AttachmentToken: this.attachmentToken,
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

  async parseResponse(response: Response): Promise<ImmediateBookResponse> {
    const data = await response.json();
    return data as ImmediateBookResponse;
  }
}
