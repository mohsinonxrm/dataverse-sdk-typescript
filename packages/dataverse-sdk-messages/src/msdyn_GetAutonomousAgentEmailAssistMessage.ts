import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAutonomousAgentEmailAssist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutonomousAgentEmailAssistRequestParameters {
  emailAssistRequestPayload: string;
  emailAssistAdditionalInformation: string;
  emailAssistRequestHeader: string;
}

/**
 * msdyn_GetAutonomousAgentEmailAssist request message
 *
 * Web API Action: msdyn_GetAutonomousAgentEmailAssist
 */
export class msdyn_GetAutonomousAgentEmailAssistRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutonomousAgentEmailAssistResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAutonomousAgentEmailAssistRequestParameters>;

  constructor(parameters: msdyn_GetAutonomousAgentEmailAssistRequestParameters) {
    super("msdyn_GetAutonomousAgentEmailAssist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutonomousAgentEmailAssist`;

    const body = requestBody({
      emailAssistRequestPayload: this.Parameters.emailAssistRequestPayload,
      emailAssistAdditionalInformation: this.Parameters.emailAssistAdditionalInformation,
      emailAssistRequestHeader: this.Parameters.emailAssistRequestHeader,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutonomousAgentEmailAssistResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAutonomousAgentEmailAssistResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAutonomousAgentEmailAssist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAutonomousAgentEmailAssistResult {
  "@odata.context"?: string;
  emailContent: string;
  emailSubject: string;
  isGovernanceAgentGuardrailViolated: boolean;
}

/**
 * msdyn_GetAutonomousAgentEmailAssist response message
 *
 * `result` is the value the msdyn_GetAutonomousAgentEmailAssist action returns (see {@link msdyn_GetAutonomousAgentEmailAssistResult}).
 */
export class msdyn_GetAutonomousAgentEmailAssistResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutonomousAgentEmailAssistResult) {
    super("msdyn_GetAutonomousAgentEmailAssist");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAutonomousAgentEmailAssistResponse {
    return new msdyn_GetAutonomousAgentEmailAssistResponse(
      data as msdyn_GetAutonomousAgentEmailAssistResult
    );
  }
}
