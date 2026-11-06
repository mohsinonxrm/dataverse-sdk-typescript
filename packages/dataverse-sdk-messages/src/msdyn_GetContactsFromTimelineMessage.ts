import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetContactsFromTimeline message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsFromTimelineRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsFromTimeline request message
 *
 * Web API Action: msdyn_GetContactsFromTimeline
 */
export class msdyn_GetContactsFromTimelineRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsFromTimelineResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetContactsFromTimelineRequestParameters>;

  constructor(parameters: msdyn_GetContactsFromTimelineRequestParameters) {
    super("msdyn_GetContactsFromTimeline", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromTimeline`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordId: this.Parameters.RecordId,
      CustomActionInputs: this.Parameters.CustomActionInputs,
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
    return msdyn_GetContactsFromTimelineResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetContactsFromTimeline action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetContactsFromTimelineResult {
  "@odata.context"?: string;
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsFromTimeline response message
 *
 * `result` is the value the msdyn_GetContactsFromTimeline action returns (see {@link msdyn_GetContactsFromTimelineResult}).
 */
export class msdyn_GetContactsFromTimelineResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromTimelineResult) {
    super("msdyn_GetContactsFromTimeline");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetContactsFromTimelineResponse {
    return new msdyn_GetContactsFromTimelineResponse(data as msdyn_GetContactsFromTimelineResult);
  }
}
