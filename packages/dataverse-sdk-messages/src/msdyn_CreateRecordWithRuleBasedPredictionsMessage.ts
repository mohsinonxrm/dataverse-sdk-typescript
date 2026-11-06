import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateRecordWithRuleBasedPredictions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters {
  msdyn_Target: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateRecordWithRuleBasedPredictions request message
 *
 * Web API Action: msdyn_CreateRecordWithRuleBasedPredictions
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRecordWithRuleBasedPredictionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters>;

  constructor(parameters: msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters) {
    super("msdyn_CreateRecordWithRuleBasedPredictions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRecordWithRuleBasedPredictions`;

    const body = requestBody({
      msdyn_Target: this.Parameters.msdyn_Target,
      msdyn_ContextGenerationParameters: this.Parameters.msdyn_ContextGenerationParameters,
      msdyn_Context: this.Parameters.msdyn_Context,
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
    if (response.status === 204)
      return msdyn_CreateRecordWithRuleBasedPredictionsResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_CreateRecordWithRuleBasedPredictionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateRecordWithRuleBasedPredictions action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateRecordWithRuleBasedPredictionsResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_CreateRecordWithRuleBasedPredictions response message
 *
 * `result` is the value the msdyn_CreateRecordWithRuleBasedPredictions action returns (see {@link msdyn_CreateRecordWithRuleBasedPredictionsResult}).
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRecordWithRuleBasedPredictionsResult) {
    super("msdyn_CreateRecordWithRuleBasedPredictions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateRecordWithRuleBasedPredictionsResponse {
    return new msdyn_CreateRecordWithRuleBasedPredictionsResponse(
      (data ?? null) as msdyn_CreateRecordWithRuleBasedPredictionsResult
    );
  }
}
