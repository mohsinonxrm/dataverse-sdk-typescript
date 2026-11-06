import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ConversationConductorEnablerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ConversationConductorEnabler action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConversationConductorEnablerResult {
  "@odata.context"?: string;
  ErrorCode: string;
  ErrorDescription: string;
}

/**
 * msdyn_ConversationConductorEnabler response message
 *
 * `result` is the value the msdyn_ConversationConductorEnabler action returns (see {@link msdyn_ConversationConductorEnablerResult}).
 */
export class msdyn_ConversationConductorEnablerResponse extends OrganizationResponse {
  constructor(public result: msdyn_ConversationConductorEnablerResult) {
    super("msdyn_ConversationConductorEnabler");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ConversationConductorEnablerResponse {
    return new msdyn_ConversationConductorEnablerResponse(
      data as msdyn_ConversationConductorEnablerResult
    );
  }
}
