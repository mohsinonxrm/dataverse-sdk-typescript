import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_PredictFieldsBasedOnRules action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_PredictFieldsBasedOnRulesResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_PredictFieldsBasedOnRules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictFieldsBasedOnRulesActionParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_PredictFieldsBasedOnRules action
 *
 * Unbound action
 */
export class msdyn_PredictFieldsBasedOnRulesAction implements Executable<msdyn_PredictFieldsBasedOnRulesResponse> {
  constructor(public readonly parameters: msdyn_PredictFieldsBasedOnRulesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictFieldsBasedOnRules`;

    const body = requestBody({
      msdyn_Target: this.parameters.msdyn_Target,
      msdyn_ContextGenerationParameters: this.parameters.msdyn_ContextGenerationParameters,
      msdyn_Context: this.parameters.msdyn_Context,
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

  async parseResponse(response: Response): Promise<msdyn_PredictFieldsBasedOnRulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PredictFieldsBasedOnRulesResponse;
    return (await response.json()) as msdyn_PredictFieldsBasedOnRulesResponse;
  }
}
