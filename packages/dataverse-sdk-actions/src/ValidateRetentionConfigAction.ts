import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ValidateRetentionConfig action
 */
export interface ValidateRetentionConfigResponse {
  IsValidationSuccessful: boolean;
  ErrorMessage: string;
}

/**
 * ValidateRetentionConfig action
 *
 * Unbound action
 */
export class ValidateRetentionConfigAction implements Executable<ValidateRetentionConfigResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly entityName: string,
    public readonly fetchXml: string,
    public readonly retentionConfigId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateRetentionConfig`;

    const body: Record<string, unknown> = {
      Target: this.target,
      EntityName: this.entityName,
      FetchXml: this.fetchXml,
      RetentionConfigId: this.retentionConfigId,
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

  async parseResponse(response: Response): Promise<ValidateRetentionConfigResponse> {
    const data = await response.json();
    return data as ValidateRetentionConfigResponse;
  }
}
