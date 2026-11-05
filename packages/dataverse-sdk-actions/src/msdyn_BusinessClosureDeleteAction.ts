import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_BusinessClosureDelete action
 */
export interface msdyn_BusinessClosureDeleteResponse {
  RemainingIds: string;
}

/**
 * msdyn_BusinessClosureDelete action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureDeleteAction implements Executable<msdyn_BusinessClosureDeleteResponse> {
  constructor(public readonly ids: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureDelete`;

    const body: Record<string, unknown> = {
      Ids: this.ids,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureDeleteResponse> {
    const data = await response.json();
    return data as msdyn_BusinessClosureDeleteResponse;
  }
}
