import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_UpdateRecordWithRuleBasedPredictions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateRecordWithRuleBasedPredictionsResponse {
  "@odata.context"?: string;
  msdyn_UpdatedRecords: string[];
}

/**
 * Parameters of the msdyn_UpdateRecordWithRuleBasedPredictions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRecordWithRuleBasedPredictionsActionParameters {
  msdyn_MatchingRuleId?: string;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
  msdyn_Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions action
 *
 * Unbound action
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsAction implements Executable<msdyn_UpdateRecordWithRuleBasedPredictionsResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateRecordWithRuleBasedPredictionsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRecordWithRuleBasedPredictions`;

    const body = requestBody({
      msdyn_MatchingRuleId: this.parameters.msdyn_MatchingRuleId,
      msdyn_ContextGenerationParameters: this.parameters.msdyn_ContextGenerationParameters,
      msdyn_Context: this.parameters.msdyn_Context,
      msdyn_Target: this.parameters.msdyn_Target,
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
  ): Promise<msdyn_UpdateRecordWithRuleBasedPredictionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateRecordWithRuleBasedPredictionsResponse;
  }
}
