import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetContactsFromTimeline action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetContactsFromTimelineResponse {
  "@odata.context"?: string;
  CustomActionSuggestedUsers: string;
}

/**
 * Parameters of the msdyn_GetContactsFromTimeline action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsFromTimelineActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsFromTimeline action
 *
 * Unbound action
 */
export class msdyn_GetContactsFromTimelineAction implements Executable<msdyn_GetContactsFromTimelineResponse> {
  constructor(public readonly parameters: msdyn_GetContactsFromTimelineActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromTimeline`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
      CustomActionInputs: this.parameters.CustomActionInputs,
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

  async parseResponse(response: Response): Promise<msdyn_GetContactsFromTimelineResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetContactsFromTimelineResponse;
  }
}
