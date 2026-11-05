import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_PredictFieldsBasedOnRules action
 */
export interface msdyn_PredictFieldsBasedOnRulesResponse {
  value: EntityReference;
}

/**
 * msdyn_PredictFieldsBasedOnRules action
 *
 * Unbound action
 */
export class msdyn_PredictFieldsBasedOnRulesAction implements Executable<msdyn_PredictFieldsBasedOnRulesResponse> {
  constructor(
    public readonly msdyn_Target: EntityReference,
    public readonly msdyn_ContextGenerationParameters: string,
    public readonly msdyn_Context: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictFieldsBasedOnRules`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
      msdyn_ContextGenerationParameters: this.msdyn_ContextGenerationParameters,
      msdyn_Context: this.msdyn_Context,
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

  async parseResponse(response: Response): Promise<msdyn_PredictFieldsBasedOnRulesResponse> {
    const data = await response.json();
    return data as msdyn_PredictFieldsBasedOnRulesResponse;
  }
}
