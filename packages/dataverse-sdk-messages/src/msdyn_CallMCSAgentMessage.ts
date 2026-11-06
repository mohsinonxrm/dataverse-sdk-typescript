import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CallMCSAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CallMCSAgentRequestParameters {
  Body: string;
  ConversationId: string;
  AgentSchema: string;
  AgentType: string;
  Operation: string;
  EnvironmentId: string;
}

/**
 * msdyn_CallMCSAgent request message
 *
 * Web API Action: msdyn_CallMCSAgent
 */
export class msdyn_CallMCSAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_CallMCSAgentResponse>
{
  declare readonly Parameters: Readonly<msdyn_CallMCSAgentRequestParameters>;

  constructor(parameters: msdyn_CallMCSAgentRequestParameters) {
    super("msdyn_CallMCSAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CallMCSAgent`;

    const body = requestBody({
      Body: this.Parameters.Body,
      ConversationId: this.Parameters.ConversationId,
      AgentSchema: this.Parameters.AgentSchema,
      AgentType: this.Parameters.AgentType,
      Operation: this.Parameters.Operation,
      EnvironmentId: this.Parameters.EnvironmentId,
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

  async parseResponse(response: Response): Promise<msdyn_CallMCSAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CallMCSAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CallMCSAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CallMCSAgentResult {
  "@odata.context"?: string;
  ResponsePayload: string;
}

/**
 * msdyn_CallMCSAgent response message
 *
 * `result` is the value the msdyn_CallMCSAgent action returns (see {@link msdyn_CallMCSAgentResult}).
 */
export class msdyn_CallMCSAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_CallMCSAgentResult) {
    super("msdyn_CallMCSAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CallMCSAgentResponse {
    return new msdyn_CallMCSAgentResponse(data as msdyn_CallMCSAgentResult);
  }
}
