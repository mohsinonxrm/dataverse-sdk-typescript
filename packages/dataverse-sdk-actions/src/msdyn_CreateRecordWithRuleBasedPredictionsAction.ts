import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateRecordWithRuleBasedPredictions action
 */
export interface msdyn_CreateRecordWithRuleBasedPredictionsResponse {
  value: EntityReference;
}

/**
 * msdyn_CreateRecordWithRuleBasedPredictions action
 *
 * Unbound action
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsAction implements Executable<msdyn_CreateRecordWithRuleBasedPredictionsResponse> {
  constructor(
    public readonly msdyn_Context: EntityReference,
    public readonly msdyn_ContextGenerationParameters: string,
    public readonly msdyn_Target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRecordWithRuleBasedPredictions`;

    const body: Record<string, unknown> = {
      msdyn_Context: this.msdyn_Context,
      msdyn_ContextGenerationParameters: this.msdyn_ContextGenerationParameters,
      msdyn_Target: this.msdyn_Target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateRecordWithRuleBasedPredictionsResponse> {
    const data = await response.json();
    return data as msdyn_CreateRecordWithRuleBasedPredictionsResponse;
  }
}
