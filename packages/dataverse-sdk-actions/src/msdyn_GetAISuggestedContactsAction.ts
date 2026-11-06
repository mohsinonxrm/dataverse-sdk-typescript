import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetAISuggestedContacts action
 */
export interface msdyn_GetAISuggestedContactsResponse {
  AISuggestionPayloads: string;
}

/**
 * Parameters of the msdyn_GetAISuggestedContacts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAISuggestedContactsActionParameters {
  EntityLogicalName: string;
  RecordId: string;
}

/**
 * msdyn_GetAISuggestedContacts action
 *
 * Unbound action
 */
export class msdyn_GetAISuggestedContactsAction implements Executable<msdyn_GetAISuggestedContactsResponse> {
  constructor(public readonly parameters: msdyn_GetAISuggestedContactsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAISuggestedContacts`;

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

  async parseResponse(response: Response): Promise<msdyn_GetAISuggestedContactsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetAISuggestedContactsResponse;
    return (await response.json()) as msdyn_GetAISuggestedContactsResponse;
  }
}
