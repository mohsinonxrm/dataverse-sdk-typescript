import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAISuggestedContacts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAISuggestedContactsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAISuggestedContactsResponse;
  }
}
