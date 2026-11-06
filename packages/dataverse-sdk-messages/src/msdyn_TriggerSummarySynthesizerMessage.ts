import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TriggerSummarySynthesizerResponse as msdyn_TriggerSummarySynthesizerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TriggerSummarySynthesizer message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerSummarySynthesizerRequestParameters {
  TriggerSummarySynthesizerRequest: string;
}

/**
 * msdyn_TriggerSummarySynthesizer request message
 *
 * Web API Action: msdyn_TriggerSummarySynthesizer
 */
export class msdyn_TriggerSummarySynthesizerRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerSummarySynthesizerResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerSummarySynthesizerRequestParameters>;

  constructor(parameters: msdyn_TriggerSummarySynthesizerRequestParameters) {
    super("msdyn_TriggerSummarySynthesizer", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSummarySynthesizer`;

    const body = requestBody({
      TriggerSummarySynthesizerRequest: this.Parameters.TriggerSummarySynthesizerRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerSummarySynthesizerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_TriggerSummarySynthesizerResponse.fromResponse({});
    return msdyn_TriggerSummarySynthesizerResponse.fromResponse(await response.json());
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
