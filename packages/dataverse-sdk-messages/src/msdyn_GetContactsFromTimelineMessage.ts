import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetContactsFromTimelineResponse as msdyn_GetContactsFromTimelineResponseData } from "./types/index.js";

/**
 * msdyn_GetContactsFromTimeline request message
 *
 * Web API Action: msdyn_GetContactsFromTimeline
 */
export class msdyn_GetContactsFromTimelineRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsFromTimelineResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public customActionInputs: string
  ) {
    super("msdyn_GetContactsFromTimeline");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromTimeline`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      CustomActionInputs: this.customActionInputs,
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

  async parseResponse(response: Response): Promise<msdyn_GetContactsFromTimelineResponse> {
    const data = await response.json();
    return msdyn_GetContactsFromTimelineResponse.fromResponse(data);
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
