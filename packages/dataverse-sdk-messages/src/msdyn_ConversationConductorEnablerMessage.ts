import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ConversationConductorEnablerResponse as msdyn_ConversationConductorEnablerResponseData } from "./types/index.js";

/**
 * msdyn_ConversationConductorEnabler request message
 *
 * Web API Action: msdyn_ConversationConductorEnabler
 */
export class msdyn_ConversationConductorEnablerRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConversationConductorEnablerResponse>
{
  constructor(
    public botApplicationId: string,
    public applicationId: string,
    public firstName: string,
    public lastName: string,
    public botHandle: string,
    public owningEnvironmentId: string,
    public properties: string
  ) {
    super("msdyn_ConversationConductorEnabler");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConversationConductorEnabler`;

    const body: Record<string, unknown> = {
      BotApplicationId: this.botApplicationId,
      ApplicationId: this.applicationId,
      FirstName: this.firstName,
      LastName: this.lastName,
      BotHandle: this.botHandle,
      OwningEnvironmentId: this.owningEnvironmentId,
      Properties: this.properties,
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

  async parseResponse(response: Response): Promise<msdyn_ConversationConductorEnablerResponse> {
    const data = await response.json();
    return msdyn_ConversationConductorEnablerResponse.fromResponse(data);
  }
}

/**
 * msdyn_ConversationConductorEnabler response message
 */
export class msdyn_ConversationConductorEnablerResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConversationConductorEnablerResponseData) {
    super("msdyn_ConversationConductorEnabler");
  }

  static fromResponse(data: unknown): msdyn_ConversationConductorEnablerResponse {
    return new msdyn_ConversationConductorEnablerResponse(
      responseObject<msdyn_ConversationConductorEnablerResponseData>(data)
    );
  }
}
