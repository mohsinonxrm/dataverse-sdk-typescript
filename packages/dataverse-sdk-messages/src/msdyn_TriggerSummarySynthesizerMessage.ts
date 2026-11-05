import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      TriggerSummarySynthesizerRequest: this.triggerSummarySynthesizerRequest,
    };
  }
}

/**
 * msdyn_TriggerSummarySynthesizer response message
 */
export class msdyn_TriggerSummarySynthesizerResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSummarySynthesizerResponse) {
    super("msdyn_TriggerSummarySynthesizer");
  }

  static fromResponse(data: unknown): msdyn_TriggerSummarySynthesizerResponse {
    return new msdyn_TriggerSummarySynthesizerResponse((data as any).value);
  }
}
