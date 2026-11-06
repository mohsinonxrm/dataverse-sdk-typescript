import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_fetchAutonomousCaseCreateUpdateRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_fetchAutonomousCaseCreateUpdateRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchAutonomousCaseCreateUpdateRuleResult {
  "@odata.context"?: string;
  autonomousCaseCreateUpdateRule: string;
}

/**
 * msdyn_fetchAutonomousCaseCreateUpdateRule response message
 *
 * `result` is the value the msdyn_fetchAutonomousCaseCreateUpdateRule action returns (see {@link msdyn_fetchAutonomousCaseCreateUpdateRuleResult}).
 */
export class msdyn_fetchAutonomousCaseCreateUpdateRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchAutonomousCaseCreateUpdateRuleResult) {
    super("msdyn_fetchAutonomousCaseCreateUpdateRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_fetchAutonomousCaseCreateUpdateRuleResponse {
    return new msdyn_fetchAutonomousCaseCreateUpdateRuleResponse(
      data as msdyn_fetchAutonomousCaseCreateUpdateRuleResult
    );
  }
}
