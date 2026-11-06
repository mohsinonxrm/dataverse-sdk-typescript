import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdatePBRRules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatePBRRulesRequestParameters {
  RulesetId: string;
  RuleUpdates: string;
}

/**
 * msdyn_UpdatePBRRules request message
 *
 * Web API Action: msdyn_UpdatePBRRules
 */
export class msdyn_UpdatePBRRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdatePBRRulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdatePBRRulesRequestParameters>;

  constructor(parameters: msdyn_UpdatePBRRulesRequestParameters) {
    super("msdyn_UpdatePBRRules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdatePBRRules`;

    const body = requestBody({
      RulesetId: this.Parameters.RulesetId,
      RuleUpdates: this.Parameters.RuleUpdates,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatePBRRulesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdatePBRRulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdatePBRRules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdatePBRRulesResult {
  "@odata.context"?: string;
  Message: string;
  RuleResults: string;
  Success: boolean;
  UpdatedXml: string;
}

/**
 * msdyn_UpdatePBRRules response message
 *
 * `result` is the value the msdyn_UpdatePBRRules action returns (see {@link msdyn_UpdatePBRRulesResult}).
 */
export class msdyn_UpdatePBRRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdatePBRRulesResult) {
    super("msdyn_UpdatePBRRules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdatePBRRulesResponse {
    return new msdyn_UpdatePBRRulesResponse(data as msdyn_UpdatePBRRulesResult);
  }
}
