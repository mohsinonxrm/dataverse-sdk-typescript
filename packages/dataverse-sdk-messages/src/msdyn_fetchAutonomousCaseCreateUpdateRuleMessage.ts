import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule request message
 *
 * Web API Action: msdyn_fetchAutonomousCaseCreateUpdateRule
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchAutonomousCaseCreateUpdateRuleResponse>
{
  constructor(public fetchRuleRequest: string) {
    super("msdyn_fetchAutonomousCaseCreateUpdateRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchAutonomousCaseCreateUpdateRule`;

    const body: Record<string, unknown> = {
      fetchRuleRequest: this.fetchRuleRequest,
    };

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
    const data = await response.json();
    return msdyn_fetchAutonomousCaseCreateUpdateRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      fetchRuleRequest: this.fetchRuleRequest,
    };
  }
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule response message
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchAutonomousCaseCreateUpdateRuleResponse) {
    super("msdyn_fetchAutonomousCaseCreateUpdateRule");
  }

  static fromResponse(data: unknown): msdyn_fetchAutonomousCaseCreateUpdateRuleResponse {
    return new msdyn_fetchAutonomousCaseCreateUpdateRuleResponse((data as any).value);
  }
}
