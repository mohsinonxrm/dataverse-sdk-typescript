import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_CreateRecordWithRuleBasedPredictions request message
 *
 * Web API Action: msdyn_CreateRecordWithRuleBasedPredictions
 */
export class msdyn_CreateRecordWithRuleBasedPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRecordWithRuleBasedPredictionsResponse>
{
  constructor(
    public msdyn_Context: EntityReference,
    public msdyn_ContextGenerationParameters: string,
    public msdyn_Target: EntityReference
  ) {
    super("msdyn_CreateRecordWithRuleBasedPredictions");
  }

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
    return msdyn_CreateRecordWithRuleBasedPredictionsResponse.fromResponse(data);
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
