import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetAutoNumberSeed action
 */
export interface SetAutoNumberSeedResponse {
  // No content returned
}

/**
 * SetAutoNumberSeed action
 *
 * Unbound action
 */
export class SetAutoNumberSeedAction implements Executable<SetAutoNumberSeedResponse> {
  constructor(
    public readonly entityName: string,
    public readonly attributeName: string,
    public readonly value: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetAutoNumberSeed`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
      Value: this.value,
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

  async parseResponse(response: Response): Promise<SetAutoNumberSeedResponse> {
    // No return value (204 No Content)
    return {};
  }
}
