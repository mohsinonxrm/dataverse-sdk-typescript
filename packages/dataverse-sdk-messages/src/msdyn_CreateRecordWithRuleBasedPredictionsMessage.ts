import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateRecordWithRuleBasedPredictions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRecordWithRuleBasedPredictionsRequestParameters {
  msdyn_Context?: EntityReference | AnyEntityPayload;
  msdyn_ContextGenerationParameters?: string;
  msdyn_Target: EntityReference | AnyEntityPayload;
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
      msdyn_Context: this.Parameters.msdyn_Context,
      msdyn_ContextGenerationParameters: this.Parameters.msdyn_ContextGenerationParameters,
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
  ): Promise<msdyn_CreateRecordWithRuleBasedPredictionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateRecordWithRuleBasedPredictionsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CreateRecordWithRuleBasedPredictions response message
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_CreateRecordWithRuleBasedPredictions");
  }

  static fromResponse(data: unknown): msdyn_CreateRecordWithRuleBasedPredictionsResponse {
    return new msdyn_CreateRecordWithRuleBasedPredictionsResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
