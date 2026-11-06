import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetSuggestedContacts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSuggestedContactsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSuggestedContactsResponse;
  }
}
