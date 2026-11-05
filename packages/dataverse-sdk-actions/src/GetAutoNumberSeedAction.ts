import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetAutoNumberSeed action
 */
export interface GetAutoNumberSeedResponse {
  AutoNumberSeedValue: number;
}

/**
 * GetAutoNumberSeed action
 *
 * Unbound action
 */
export class GetAutoNumberSeedAction implements Executable<GetAutoNumberSeedResponse> {
  constructor(
    public readonly entityName: string,
    public readonly attributeName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetAutoNumberSeed`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
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

  async parseResponse(response: Response): Promise<GetAutoNumberSeedResponse> {
    const data = await response.json();
    return data as GetAutoNumberSeedResponse;
  }
}
