import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetContactsFromAssociatedConversations request message
 *
 * Web API Action: msdyn_GetContactsFromAssociatedConversations
 */
export class msdyn_GetContactsFromAssociatedConversationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsFromAssociatedConversationsResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public customActionInputs: string
  ) {
    super("msdyn_GetContactsFromAssociatedConversations");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromAssociatedConversations`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetContactsFromAssociatedConversationsResponse> {
    const data = await response.json();
    return msdyn_GetContactsFromAssociatedConversationsResponse.fromResponse(data);
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
 * msdyn_GetContactsFromAssociatedConversations response message
 */
export class msdyn_GetContactsFromAssociatedConversationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromAssociatedConversationsResponse) {
    super("msdyn_GetContactsFromAssociatedConversations");
  }

  static fromResponse(data: unknown): msdyn_GetContactsFromAssociatedConversationsResponse {
    return new msdyn_GetContactsFromAssociatedConversationsResponse((data as any).value);
  }
}
