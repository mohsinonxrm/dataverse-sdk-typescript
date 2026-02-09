import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions request message
 *
 * Web API Action: msdyn_UpdateRecordWithRuleBasedPredictions
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRecordWithRuleBasedPredictionsResponse>
{
  constructor(
    public msdyn_Target: EntityReference,
    public msdyn_Context: EntityReference,
    public msdyn_ContextGenerationParameters: string
  ) {
    super("msdyn_UpdateRecordWithRuleBasedPredictions");
  }

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
    return msdyn_UpdateRecordWithRuleBasedPredictionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Target: this.msdyn_Target,
      msdyn_Context: this.msdyn_Context,
      msdyn_ContextGenerationParameters: this.msdyn_ContextGenerationParameters,
    };
  }
}

/**
 * msdyn_UpdateRecordWithRuleBasedPredictions response message
 */
export class msdyn_UpdateRecordWithRuleBasedPredictionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRecordWithRuleBasedPredictionsResponse) {
    super("msdyn_UpdateRecordWithRuleBasedPredictions");
  }

  static fromResponse(data: unknown): msdyn_UpdateRecordWithRuleBasedPredictionsResponse {
    return new msdyn_UpdateRecordWithRuleBasedPredictionsResponse((data as any).value);
  }
}
