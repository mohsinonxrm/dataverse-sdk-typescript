import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerSummarySynthesizerResponse as msdyn_TriggerSummarySynthesizerResponseData } from "./types/index.js";

/**
 * msdyn_TriggerSummarySynthesizer request message
 *
 * Web API Action: msdyn_TriggerSummarySynthesizer
 */
export class msdyn_TriggerSummarySynthesizerRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerSummarySynthesizerResponse>
{
  constructor(public triggerSummarySynthesizerRequest: string) {
    super("msdyn_TriggerSummarySynthesizer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSummarySynthesizer`;

    const body: Record<string, unknown> = {
      TriggerSummarySynthesizerRequest: this.triggerSummarySynthesizerRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerSummarySynthesizerResponse> {
    const data = await response.json();
    return msdyn_TriggerSummarySynthesizerResponse.fromResponse(data);
  }
}

/**
 * msdyn_TriggerSummarySynthesizer response message
 */
export class msdyn_TriggerSummarySynthesizerResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSummarySynthesizerResponseData) {
    super("msdyn_TriggerSummarySynthesizer");
  }

  static fromResponse(data: unknown): msdyn_TriggerSummarySynthesizerResponse {
    return new msdyn_TriggerSummarySynthesizerResponse(
      responseObject<msdyn_TriggerSummarySynthesizerResponseData>(data)
    );
  }
}
