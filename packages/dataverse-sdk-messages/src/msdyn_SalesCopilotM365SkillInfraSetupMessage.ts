import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesCopilotM365SkillInfraSetup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup request message
 *
 * Web API Action: msdyn_SalesCopilotM365SkillInfraSetup
 */
export class msdyn_SalesCopilotM365SkillInfraSetupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesCopilotM365SkillInfraSetupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesCopilotM365SkillInfraSetupRequestParameters>;

  constructor(parameters: msdyn_SalesCopilotM365SkillInfraSetupRequestParameters) {
    super("msdyn_SalesCopilotM365SkillInfraSetup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotM365SkillInfraSetup`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotM365SkillInfraSetupResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesCopilotM365SkillInfraSetupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesCopilotM365SkillInfraSetup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesCopilotM365SkillInfraSetupResult {
  "@odata.context"?: string;
  msdyn_result: string;
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup response message
 *
 * `result` is the value the msdyn_SalesCopilotM365SkillInfraSetup action returns (see {@link msdyn_SalesCopilotM365SkillInfraSetupResult}).
 */
export class msdyn_SalesCopilotM365SkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotM365SkillInfraSetupResult) {
    super("msdyn_SalesCopilotM365SkillInfraSetup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesCopilotM365SkillInfraSetupResponse {
    return new msdyn_SalesCopilotM365SkillInfraSetupResponse(
      data as msdyn_SalesCopilotM365SkillInfraSetupResult
    );
  }
}
