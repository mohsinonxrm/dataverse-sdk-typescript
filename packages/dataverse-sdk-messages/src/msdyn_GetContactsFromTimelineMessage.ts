import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetContactsFromTimelineResponse as msdyn_GetContactsFromTimelineResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetContactsFromTimelineResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetContactsFromTimeline response message
 */
export class msdyn_GetContactsFromTimelineResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromTimelineResponseData) {
    super("msdyn_GetContactsFromTimeline");
  }

  static fromResponse(data: unknown): msdyn_GetContactsFromTimelineResponse {
    return new msdyn_GetContactsFromTimelineResponse(
      responseObject<msdyn_GetContactsFromTimelineResponseData>(data)
    );
  }
}
