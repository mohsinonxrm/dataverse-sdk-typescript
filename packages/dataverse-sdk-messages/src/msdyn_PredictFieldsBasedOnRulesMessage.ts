import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_PredictFieldsBasedOnRules request message
 *
 * Web API Action: msdyn_PredictFieldsBasedOnRules
 */
export class msdyn_PredictFieldsBasedOnRulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictFieldsBasedOnRulesResponse>
{
  constructor(
    public msdyn_Target: EntityReference | AnyEntityPayload,
    public msdyn_ContextGenerationParameters?: string,
    public msdyn_Context?: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_PredictFieldsBasedOnRules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictFieldsBasedOnRules`;

    const body: Record<string, unknown> = {
      msdyn_Target: this.msdyn_Target,
      msdyn_ContextGenerationParameters: this.msdyn_ContextGenerationParameters,
      msdyn_Context: this.msdyn_Context,
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

  async parseResponse(response: Response): Promise<msdyn_PredictFieldsBasedOnRulesResponse> {
    const data = await response.json();
    return msdyn_PredictFieldsBasedOnRulesResponse.fromResponse(data);
  }
}

/**
 * msdyn_PredictFieldsBasedOnRules response message
 */
export class msdyn_PredictFieldsBasedOnRulesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_PredictFieldsBasedOnRules");
  }

  static fromResponse(data: unknown): msdyn_PredictFieldsBasedOnRulesResponse {
    return new msdyn_PredictFieldsBasedOnRulesResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
