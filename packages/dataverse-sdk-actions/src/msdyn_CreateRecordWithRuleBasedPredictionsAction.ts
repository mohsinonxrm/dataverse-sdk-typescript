import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CreateRecordWithRuleBasedPredictions action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_CreateRecordWithRuleBasedPredictionsResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
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
        "content-type": "application/json",
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
