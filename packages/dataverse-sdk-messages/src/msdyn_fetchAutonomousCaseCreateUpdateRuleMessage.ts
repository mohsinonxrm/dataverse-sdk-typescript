import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_fetchAutonomousCaseCreateUpdateRuleResponse as msdyn_fetchAutonomousCaseCreateUpdateRuleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_fetchAutonomousCaseCreateUpdateRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchAutonomousCaseCreateUpdateRuleRequestParameters {
  fetchRuleRequest: string;
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule request message
 *
 * Web API Action: msdyn_fetchAutonomousCaseCreateUpdateRule
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchAutonomousCaseCreateUpdateRuleRequestParameters>;

  constructor(parameters: msdyn_fetchAutonomousCaseCreateUpdateRuleRequestParameters) {
    super("msdyn_fetchAutonomousCaseCreateUpdateRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchAutonomousCaseCreateUpdateRule`;

    const body = requestBody({
      fetchRuleRequest: this.Parameters.fetchRuleRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_fetchAutonomousCaseCreateUpdateRuleResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule response message
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchAutonomousCaseCreateUpdateRuleResponseData) {
    super("msdyn_fetchAutonomousCaseCreateUpdateRule");
  }

  static fromResponse(data: unknown): msdyn_fetchAutonomousCaseCreateUpdateRuleResponse {
    return new msdyn_fetchAutonomousCaseCreateUpdateRuleResponse(
      responseObject<msdyn_fetchAutonomousCaseCreateUpdateRuleResponseData>(data)
    );
  }
}
