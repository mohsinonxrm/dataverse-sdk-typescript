import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ConversationConductorEnablerResponse as msdyn_ConversationConductorEnablerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ConversationConductorEnabler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConversationConductorEnablerRequestParameters {
  BotApplicationId: string;
  ApplicationId?: string;
  FirstName: string;
  LastName: string;
  BotHandle?: string;
  OwningEnvironmentId?: string;
  Properties?: string;
}

/**
 * msdyn_ConversationConductorEnabler request message
 *
 * Web API Action: msdyn_ConversationConductorEnabler
 */
export class msdyn_ConversationConductorEnablerRequest
  extends OrganizationRequest
  implements Executable<msdyn_ConversationConductorEnablerResponse>
{
  declare readonly Parameters: Readonly<msdyn_ConversationConductorEnablerRequestParameters>;

  constructor(parameters: msdyn_ConversationConductorEnablerRequestParameters) {
    super("msdyn_ConversationConductorEnabler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConversationConductorEnabler`;

    const body = requestBody({
      BotApplicationId: this.Parameters.BotApplicationId,
      ApplicationId: this.Parameters.ApplicationId,
      FirstName: this.Parameters.FirstName,
      LastName: this.Parameters.LastName,
      BotHandle: this.Parameters.BotHandle,
      OwningEnvironmentId: this.Parameters.OwningEnvironmentId,
      Properties: this.Parameters.Properties,
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

  async parseResponse(response: Response): Promise<msdyn_ConversationConductorEnablerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ConversationConductorEnablerResponse.fromResponse(text ? JSON.parse(text) : {});
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
