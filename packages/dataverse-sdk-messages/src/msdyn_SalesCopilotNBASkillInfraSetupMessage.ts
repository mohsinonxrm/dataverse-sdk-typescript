import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesCopilotNBASkillInfraSetupResponse as msdyn_SalesCopilotNBASkillInfraSetupResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesCopilotNBASkillInfraSetupResponse.fromResponse({});
    return msdyn_SalesCopilotNBASkillInfraSetupResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesCopilotNBASkillInfraSetup response message
 */
export class msdyn_SalesCopilotNBASkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotNBASkillInfraSetupResponseData) {
    super("msdyn_SalesCopilotNBASkillInfraSetup");
  }

  static fromResponse(data: unknown): msdyn_SalesCopilotNBASkillInfraSetupResponse {
    return new msdyn_SalesCopilotNBASkillInfraSetupResponse(
      responseObject<msdyn_SalesCopilotNBASkillInfraSetupResponseData>(data)
    );
  }
}
