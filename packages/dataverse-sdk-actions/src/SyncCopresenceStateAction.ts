import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SyncCopresenceState action
 */
export interface SyncCopresenceStateResponse {
  CopresenceInfo: string;
}

/**
 * SyncCopresenceState action
 *
 * Unbound action
 */
export class SyncCopresenceStateAction implements Executable<SyncCopresenceStateResponse> {
  constructor(
    public readonly resourceId: string,
    public readonly resourceType: string,
    public readonly userConnectionDetails: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncCopresenceState`;

    const body: Record<string, unknown> = {
      ResourceId: this.resourceId,
      ResourceType: this.resourceType,
      UserConnectionDetails: this.userConnectionDetails,
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

  async parseResponse(response: Response): Promise<SyncCopresenceStateResponse> {
    const data = await response.json();
    return data as SyncCopresenceStateResponse;
  }
}
