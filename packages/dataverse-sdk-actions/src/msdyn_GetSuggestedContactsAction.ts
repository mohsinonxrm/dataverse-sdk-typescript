import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSuggestedContacts action
 */
export interface msdyn_GetSuggestedContactsResponse {
  SuggestedContacts: string;
  IsUserLevelLocalized: boolean;
}

/**
 * msdyn_GetSuggestedContacts action
 *
 * Unbound action
 */
export class msdyn_GetSuggestedContactsAction implements Executable<msdyn_GetSuggestedContactsResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSuggestedContacts`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSuggestedContactsResponse> {
    const data = await response.json();
    return data as msdyn_GetSuggestedContactsResponse;
  }
}
