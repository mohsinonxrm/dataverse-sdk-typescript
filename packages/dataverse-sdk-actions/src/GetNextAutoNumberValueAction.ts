import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetNextAutoNumberValue action
 */
export interface GetNextAutoNumberValueResponse {
  NextAutoNumberValue: number;
}

/**
 * GetNextAutoNumberValue action
 *
 * Unbound action
 */
export class GetNextAutoNumberValueAction implements Executable<GetNextAutoNumberValueResponse> {
  constructor(
    public readonly entityName: string,
    public readonly attributeName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    const data = await response.json();
    return data as GetNextAutoNumberValueResponse;
  }
}
