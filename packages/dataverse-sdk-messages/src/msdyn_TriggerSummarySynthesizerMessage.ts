import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerSummarySynthesizerResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerSummarySynthesizer action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerSummarySynthesizerResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_TriggerSummarySynthesizer response message
 *
 * `result` is the value the msdyn_TriggerSummarySynthesizer action returns (see {@link msdyn_TriggerSummarySynthesizerResult}).
 */
export class msdyn_TriggerSummarySynthesizerResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSummarySynthesizerResult) {
    super("msdyn_TriggerSummarySynthesizer");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerSummarySynthesizerResponse {
    return new msdyn_TriggerSummarySynthesizerResponse(
      data as msdyn_TriggerSummarySynthesizerResult
    );
  }
}
