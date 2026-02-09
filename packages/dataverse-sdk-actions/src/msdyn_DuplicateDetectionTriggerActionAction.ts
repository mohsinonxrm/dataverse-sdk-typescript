import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DuplicateDetectionTriggerAction action
 */
export interface msdyn_DuplicateDetectionTriggerActionResponse {
  // No content returned
}

/**
 * msdyn_DuplicateDetectionTriggerAction action
 *
 * Unbound action
 */
export class msdyn_DuplicateDetectionTriggerActionAction implements Executable<msdyn_DuplicateDetectionTriggerActionResponse> {
  constructor(
    public readonly baseRecordType: string,
    public readonly baseRecordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DuplicateDetectionTriggerAction`;

    const body: Record<string, unknown> = {
      BaseRecordType: this.baseRecordType,
      BaseRecordId: this.baseRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_DuplicateDetectionTriggerActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
