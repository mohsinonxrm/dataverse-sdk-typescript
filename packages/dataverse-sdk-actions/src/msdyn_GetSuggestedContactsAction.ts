import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSuggestedContacts action
 */
export interface msdyn_GetSuggestedContactsResponse {
  IsUserLevelLocalized: boolean;
  SuggestedContacts: string;
}

/**
 * Parameters of the msdyn_GetSuggestedContacts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSuggestedContactsActionParameters {
  EntityLogicalName: string;
  RecordId: string;
}

/**
 * msdyn_GetSuggestedContacts action
 *
 * Unbound action
 */
export class msdyn_GetSuggestedContactsAction implements Executable<msdyn_GetSuggestedContactsResponse> {
  constructor(public readonly parameters: msdyn_GetSuggestedContactsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSuggestedContacts`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSuggestedContactsResponse;
    return (await response.json()) as msdyn_GetSuggestedContactsResponse;
  }
}
