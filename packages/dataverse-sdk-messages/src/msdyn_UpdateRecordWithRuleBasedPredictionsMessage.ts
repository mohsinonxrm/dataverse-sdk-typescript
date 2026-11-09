import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_UpdateRecordWithRuleBasedPredictions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRecordWithRuleBasedPredictionsRequestParameters {
  msdyn_MatchingRuleId?: string;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Context?: EntityReference | AnyEntityPayload;
  msdyn_Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions request message
 *
 * Web API Action: msdyn_UpdateRecordWithRuleBasedPredictions
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRecordWithRuleBasedPredictionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateRecordWithRuleBasedPredictionsRequestParameters>;

  constructor(parameters: msdyn_UpdateRecordWithRuleBasedPredictionsRequestParameters) {
    super("msdyn_UpdateRecordWithRuleBasedPredictions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRecordWithRuleBasedPredictions`;

    const body = requestBody({
      msdyn_MatchingRuleId: this.Parameters.msdyn_MatchingRuleId,
      msdyn_ContextGenerationParameters: this.Parameters.msdyn_ContextGenerationParameters,
      msdyn_Context: this.Parameters.msdyn_Context,
      msdyn_Target: this.Parameters.msdyn_Target,
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
    return msdyn_UpdateRecordWithRuleBasedPredictionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateRecordWithRuleBasedPredictions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateRecordWithRuleBasedPredictionsResult {
  "@odata.context"?: string;
  msdyn_UpdatedRecords: string[];
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions response message
 *
 * `result` is the value the msdyn_UpdateRecordWithRuleBasedPredictions action returns (see {@link msdyn_UpdateRecordWithRuleBasedPredictionsResult}).
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRecordWithRuleBasedPredictionsResult) {
    super("msdyn_UpdateRecordWithRuleBasedPredictions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateRecordWithRuleBasedPredictionsResponse {
    return new msdyn_UpdateRecordWithRuleBasedPredictionsResponse(
      data as msdyn_UpdateRecordWithRuleBasedPredictionsResult
    );
  }
}
