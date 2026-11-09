import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesCopilotNBASkillInfraSetup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesCopilotNBASkillInfraSetupRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup request message
 *
 * Web API Action: msdyn_SalesCopilotNBASkillInfraSetup
 */
export class msdyn_SalesCopilotNBASkillInfraSetupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesCopilotNBASkillInfraSetupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesCopilotNBASkillInfraSetupRequestParameters>;

  constructor(parameters: msdyn_SalesCopilotNBASkillInfraSetupRequestParameters) {
    super("msdyn_SalesCopilotNBASkillInfraSetup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesCopilotNBASkillInfraSetup`;

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

  async parseResponse(response: Response): Promise<msdyn_SalesCopilotNBASkillInfraSetupResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesCopilotNBASkillInfraSetupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesCopilotNBASkillInfraSetup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesCopilotNBASkillInfraSetupResult {
  "@odata.context"?: string;
  msdyn_result: string;
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup response message
 *
 * `result` is the value the msdyn_SalesCopilotNBASkillInfraSetup action returns (see {@link msdyn_SalesCopilotNBASkillInfraSetupResult}).
 */
export class msdyn_SalesCopilotNBASkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotNBASkillInfraSetupResult) {
    super("msdyn_SalesCopilotNBASkillInfraSetup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesCopilotNBASkillInfraSetupResponse {
    return new msdyn_SalesCopilotNBASkillInfraSetupResponse(
      data as msdyn_SalesCopilotNBASkillInfraSetupResult
    );
  }
}
