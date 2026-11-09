import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetContactsFromAssociatedConversationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetContactsFromAssociatedConversations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetContactsFromAssociatedConversationsResult {
  "@odata.context"?: string;
  CustomActionSuggestedUsers: string;
}

/**
 * msdyn_GetContactsFromAssociatedConversations response message
 *
 * `result` is the value the msdyn_GetContactsFromAssociatedConversations action returns (see {@link msdyn_GetContactsFromAssociatedConversationsResult}).
 */
export class msdyn_GetContactsFromAssociatedConversationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetContactsFromAssociatedConversationsResult) {
    super("msdyn_GetContactsFromAssociatedConversations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetContactsFromAssociatedConversationsResponse {
    return new msdyn_GetContactsFromAssociatedConversationsResponse(
      data as msdyn_GetContactsFromAssociatedConversationsResult
    );
  }
}
