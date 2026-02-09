import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_UpdateRecordWithRuleBasedPredictions action
 */
export interface msdyn_UpdateRecordWithRuleBasedPredictionsResponse {
  msdyn_UpdatedRecords: string[];
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions action
 *
 * Unbound action
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsAction implements Executable<msdyn_UpdateRecordWithRuleBasedPredictionsResponse> {
  constructor(
    public readonly msdyn_Target: EntityReference,
    public readonly msdyn_Context: EntityReference,
    public readonly msdyn_ContextGenerationParameters: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRecordWithRuleBasedPredictions`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
      msdyn_Context: this.msdyn_Context,
      msdyn_ContextGenerationParameters: this.msdyn_ContextGenerationParameters,
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
  ): Promise<msdyn_UpdateRecordWithRuleBasedPredictionsResponse> {
    const data = await response.json();
    return data as msdyn_UpdateRecordWithRuleBasedPredictionsResponse;
  }
}
