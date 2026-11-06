import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetContactsFromAssociatedConversationsResponse as msdyn_GetContactsFromAssociatedConversationsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetContactsFromAssociatedConversations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetContactsFromAssociatedConversationsRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  CustomActionInputs?: string;
}

/**
 * msdyn_GetContactsFromAssociatedConversations request message
 *
 * Web API Action: msdyn_GetContactsFromAssociatedConversations
 */
export class msdyn_GetContactsFromAssociatedConversationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetContactsFromAssociatedConversationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetContactsFromAssociatedConversationsRequestParameters>;

  constructor(parameters: msdyn_GetContactsFromAssociatedConversationsRequestParameters) {
    super("msdyn_GetContactsFromAssociatedConversations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetContactsFromAssociatedConversations`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetContactsFromAssociatedConversationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetContactsFromAssociatedConversationsResponse.fromResponse({});
    return msdyn_GetContactsFromAssociatedConversationsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetContactsFromAssociatedConversations response message
 */
export class msdyn_GetContactsFromAssociatedConversationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromAssociatedConversationsResponseData) {
    super("msdyn_GetContactsFromAssociatedConversations");
  }

  static fromResponse(data: unknown): msdyn_GetContactsFromAssociatedConversationsResponse {
    return new msdyn_GetContactsFromAssociatedConversationsResponse(
      responseObject<msdyn_GetContactsFromAssociatedConversationsResponseData>(data)
    );
  }
}
