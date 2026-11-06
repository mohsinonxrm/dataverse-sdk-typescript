import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_UpdateRecordWithRuleBasedPredictionsResponse as msdyn_UpdateRecordWithRuleBasedPredictionsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_UpdateRecordWithRuleBasedPredictionsResponse.fromResponse({});
    return msdyn_UpdateRecordWithRuleBasedPredictionsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions response message
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRecordWithRuleBasedPredictionsResponseData) {
    super("msdyn_UpdateRecordWithRuleBasedPredictions");
  }

  static fromResponse(data: unknown): msdyn_UpdateRecordWithRuleBasedPredictionsResponse {
    return new msdyn_UpdateRecordWithRuleBasedPredictionsResponse(
      responseObject<msdyn_UpdateRecordWithRuleBasedPredictionsResponseData>(data)
    );
  }
}
