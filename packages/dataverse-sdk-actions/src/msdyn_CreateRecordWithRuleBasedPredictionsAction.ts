import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CreateRecordWithRuleBasedPredictions action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateRecordWithRuleBasedPredictionsResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_CreateRecordWithRuleBasedPredictionsResponse;
  }
}
