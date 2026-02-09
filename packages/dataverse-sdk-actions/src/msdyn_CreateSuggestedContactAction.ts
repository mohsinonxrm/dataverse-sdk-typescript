import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateSuggestedContact action
 */
export interface msdyn_CreateSuggestedContactResponse {
  id: string;
  failedRecordCount: string;
}

/**
 * msdyn_CreateSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedContactAction implements Executable<msdyn_CreateSuggestedContactResponse> {
  constructor(public readonly suggestedContactId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedContact`;

    const body: Record<string, unknown> = {
      SuggestedContactId: this.suggestedContactId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedContactResponse> {
    const data = await response.json();
    return data as msdyn_CreateSuggestedContactResponse;
  }
}
