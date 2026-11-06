import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
 * Parameters of the msdyn_CreateRecordWithRuleBasedPredictions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRecordWithRuleBasedPredictionsActionParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateRecordWithRuleBasedPredictions action
 *
 * Unbound action
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsAction implements Executable<msdyn_CreateRecordWithRuleBasedPredictionsResponse> {
  constructor(
    public readonly parameters: msdyn_CreateRecordWithRuleBasedPredictionsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRecordWithRuleBasedPredictions`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateRecordWithRuleBasedPredictionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateRecordWithRuleBasedPredictionsResponse;
    return (await response.json()) as msdyn_CreateRecordWithRuleBasedPredictionsResponse;
  }
}
