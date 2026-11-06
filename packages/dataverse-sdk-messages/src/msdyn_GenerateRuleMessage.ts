import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GenerateRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GenerateRule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateRuleResult {
  "@odata.context"?: string;
  FailureReason: string;
  Status: string;
}

/**
 * msdyn_GenerateRule response message
 *
 * `result` is the value the msdyn_GenerateRule action returns (see {@link msdyn_GenerateRuleResult}).
 */
export class msdyn_GenerateRuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateRuleResult) {
    super("msdyn_GenerateRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GenerateRuleResponse {
    return new msdyn_GenerateRuleResponse(data as msdyn_GenerateRuleResult);
  }
}
