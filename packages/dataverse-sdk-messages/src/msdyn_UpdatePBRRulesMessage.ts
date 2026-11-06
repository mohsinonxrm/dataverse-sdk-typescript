import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdatePBRRulesResponse as msdyn_UpdatePBRRulesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpdatePBRRulesResponse.fromResponse({});
    return msdyn_UpdatePBRRulesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdatePBRRules response message
 */
export class msdyn_UpdatePBRRulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdatePBRRulesResponseData) {
    super("msdyn_UpdatePBRRules");
  }

  static fromResponse(data: unknown): msdyn_UpdatePBRRulesResponse {
    return new msdyn_UpdatePBRRulesResponse(responseObject<msdyn_UpdatePBRRulesResponseData>(data));
  }
}
