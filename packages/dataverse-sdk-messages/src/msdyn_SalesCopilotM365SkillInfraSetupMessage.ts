import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesCopilotM365SkillInfraSetupResponse as msdyn_SalesCopilotM365SkillInfraSetupResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesCopilotM365SkillInfraSetupResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesCopilotM365SkillInfraSetup response message
 */
export class msdyn_SalesCopilotM365SkillInfraSetupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesCopilotM365SkillInfraSetupResponseData) {
    super("msdyn_SalesCopilotM365SkillInfraSetup");
  }

  static fromResponse(data: unknown): msdyn_SalesCopilotM365SkillInfraSetupResponse {
    return new msdyn_SalesCopilotM365SkillInfraSetupResponse(
      responseObject<msdyn_SalesCopilotM365SkillInfraSetupResponseData>(data)
    );
  }
}
