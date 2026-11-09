import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SummarySynthesizerStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SummarySynthesizerStatusRequestParameters {
  LeadId: string;
}

/**
 * msdyn_SummarySynthesizerStatus request message
 *
 * Web API Action: msdyn_SummarySynthesizerStatus
 */
export class msdyn_SummarySynthesizerStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SummarySynthesizerStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SummarySynthesizerStatusRequestParameters>;

  constructor(parameters: msdyn_SummarySynthesizerStatusRequestParameters) {
    super("msdyn_SummarySynthesizerStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SummarySynthesizerStatus`;

    const body = requestBody({
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_SummarySynthesizerStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SummarySynthesizerStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SummarySynthesizerStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SummarySynthesizerStatusResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsComplete: boolean;
  IsSuccess: boolean;
}

/**
 * msdyn_SummarySynthesizerStatus response message
 *
 * `result` is the value the msdyn_SummarySynthesizerStatus action returns (see {@link msdyn_SummarySynthesizerStatusResult}).
 */
export class msdyn_SummarySynthesizerStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SummarySynthesizerStatusResult) {
    super("msdyn_SummarySynthesizerStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SummarySynthesizerStatusResponse {
    return new msdyn_SummarySynthesizerStatusResponse(data as msdyn_SummarySynthesizerStatusResult);
  }
}
