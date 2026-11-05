import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      CustomActionInputs: this.customActionInputs,
    };
  }
}

/**
 * msdyn_GetContactsFromTimeline response message
 */
export class msdyn_GetContactsFromTimelineResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromTimelineResponse) {
    super("msdyn_GetContactsFromTimeline");
  }

  static fromResponse(data: unknown): msdyn_GetContactsFromTimelineResponse {
    return new msdyn_GetContactsFromTimelineResponse((data as any).value);
  }
}
