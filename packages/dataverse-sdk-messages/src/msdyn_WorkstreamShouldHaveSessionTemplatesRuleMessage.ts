import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse as msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponseData } from "./types/index.js";

/**
 * msdyn_WorkstreamShouldHaveSessionTemplatesRule request message
 *
 * Web API Action: msdyn_WorkstreamShouldHaveSessionTemplatesRule
 */
export class msdyn_WorkstreamShouldHaveSessionTemplatesRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse>
{
  constructor() {
    super("msdyn_WorkstreamShouldHaveSessionTemplatesRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_WorkstreamShouldHaveSessionTemplatesRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse> {
    const data = await response.json();
    return msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse.fromResponse(data);
  }
}

/**
 * msdyn_WorkstreamShouldHaveSessionTemplatesRule response message
 */
export class msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponseData) {
    super("msdyn_WorkstreamShouldHaveSessionTemplatesRule");
  }

  static fromResponse(data: unknown): msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse {
    return new msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponse(
      responseObject<msdyn_WorkstreamShouldHaveSessionTemplatesRuleResponseData>(data)
    );
  }
}
