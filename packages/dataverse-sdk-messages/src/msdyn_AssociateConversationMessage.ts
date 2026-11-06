import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AssociateConversation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssociateConversationRequestParameters {
  msdyn_TeamsConversationId: string;
  msdyn_RegardingEntityId: string;
  msdyn_RegardingEntityName: string;
}

/**
 * msdyn_AssociateConversation request message
 *
 * Web API Action: msdyn_AssociateConversation
 */
export class msdyn_AssociateConversationRequest
  extends OrganizationRequest
  implements Executable<msdyn_AssociateConversationResponse>
{
  declare readonly Parameters: Readonly<msdyn_AssociateConversationRequestParameters>;

  constructor(parameters: msdyn_AssociateConversationRequestParameters) {
    super("msdyn_AssociateConversation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssociateConversation`;

    const body = requestBody({
      msdyn_TeamsConversationId: this.Parameters.msdyn_TeamsConversationId,
      msdyn_RegardingEntityId: this.Parameters.msdyn_RegardingEntityId,
      msdyn_RegardingEntityName: this.Parameters.msdyn_RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_AssociateConversationResponse> {
    // No return value (204 No Content)
    return new msdyn_AssociateConversationResponse();
  }
}

/**
 * msdyn_AssociateConversation response message
 */
export class msdyn_AssociateConversationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AssociateConversation");
  }

  static fromResponse(_data: unknown): msdyn_AssociateConversationResponse {
    return new msdyn_AssociateConversationResponse();
  }
}
