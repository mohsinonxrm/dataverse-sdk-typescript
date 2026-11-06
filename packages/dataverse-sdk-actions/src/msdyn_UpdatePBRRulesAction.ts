import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdatePBRRules action
 */
export interface msdyn_UpdatePBRRulesResponse {
  Message: string;
  RuleResults: string;
  Success: boolean;
  UpdatedXml: string;
}

/**
 * Parameters of the msdyn_UpdatePBRRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatePBRRulesActionParameters {
  RulesetId: string;
  RuleUpdates: string;
}

/**
 * msdyn_UpdatePBRRules action
 *
 * Unbound action
 */
export class msdyn_UpdatePBRRulesAction implements Executable<msdyn_UpdatePBRRulesResponse> {
  constructor(public readonly parameters: msdyn_UpdatePBRRulesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdatePBRRules`;

    const body = requestBody({
      RulesetId: this.parameters.RulesetId,
      RuleUpdates: this.parameters.RuleUpdates,
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
    if (response.status === 204) return {} as msdyn_UpdatePBRRulesResponse;
    return (await response.json()) as msdyn_UpdatePBRRulesResponse;
  }
}
