import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CanManyToMany action
 */
export interface CanManyToManyResponse {
  CanManyToMany: boolean;
}

/**
 * CanManyToMany action
 *
 * Unbound action
 */
export class CanManyToManyAction implements Executable<CanManyToManyResponse> {
  constructor(public readonly entityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanManyToMany`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
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

  async parseResponse(response: Response): Promise<CanManyToManyResponse> {
    const data = await response.json();
    return data as CanManyToManyResponse;
  }
}
