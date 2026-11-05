import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetContactsFromTimeline action
 */
export interface msdyn_GetContactsFromTimelineResponse {
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsFromTimeline action
 *
 * Unbound action
 */
export class msdyn_GetContactsFromTimelineAction implements Executable<msdyn_GetContactsFromTimelineResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly customActionInputs: string
  ) {}

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
    return data as msdyn_GetContactsFromTimelineResponse;
  }
}
