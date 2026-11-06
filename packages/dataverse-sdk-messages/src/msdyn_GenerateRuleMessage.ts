import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GenerateRuleResponse as msdyn_GenerateRuleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GenerateRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateRuleRequestParameters {
  OperationType: string;
  RuleId: string;
}

/**
 * msdyn_GenerateRule request message
 *
 * Web API Action: msdyn_GenerateRule
 */
export class msdyn_GenerateRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateRuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateRuleRequestParameters>;

  constructor(parameters: msdyn_GenerateRuleRequestParameters) {
    super("msdyn_GenerateRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateRule`;

    const body = requestBody({
      OperationType: this.Parameters.OperationType,
      RuleId: this.Parameters.RuleId,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GenerateRuleResponse.fromResponse({});
    return msdyn_GenerateRuleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GenerateRule response message
 */
export class msdyn_GenerateRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateRuleResponseData) {
    super("msdyn_GenerateRule");
  }

  static fromResponse(data: unknown): msdyn_GenerateRuleResponse {
    return new msdyn_GenerateRuleResponse(responseObject<msdyn_GenerateRuleResponseData>(data));
  }
}
