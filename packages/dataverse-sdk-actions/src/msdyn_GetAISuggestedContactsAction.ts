import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAISuggestedContacts action
 */
export interface msdyn_GetAISuggestedContactsResponse {
  AISuggestionPayloads: string;
}

/**
 * msdyn_GetAISuggestedContacts action
 *
 * Unbound action
 */
export class msdyn_GetAISuggestedContactsAction implements Executable<msdyn_GetAISuggestedContactsResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAISuggestedContacts`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAISuggestedContactsResponse> {
    const data = await response.json();
    return data as msdyn_GetAISuggestedContactsResponse;
  }
}
