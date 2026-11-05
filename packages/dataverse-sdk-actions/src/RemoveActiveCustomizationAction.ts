import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RemoveActiveCustomization action
 */
export interface RemoveActiveCustomizationResponse {
  Success: boolean;
}

/**
 * RemoveActiveCustomization action
 *
 * Unbound action
 */
export class RemoveActiveCustomizationAction implements Executable<RemoveActiveCustomizationResponse> {
  constructor(
    public readonly logicalName: string,
    public readonly id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveActiveCustomization`;

    const body: Record<string, unknown> = {
      LogicalName: this.logicalName,
      Id: this.id,
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationResponse> {
    const data = await response.json();
    return data as RemoveActiveCustomizationResponse;
  }
}
