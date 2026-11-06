import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_updateevaluationdetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateevaluationdetailsRequestParameters {
  msdyn_evaluationdetails: string;
}

/**
 * msdyn_updateevaluationdetails request message
 *
 * Web API Action: msdyn_updateevaluationdetails
 */
export class msdyn_updateevaluationdetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_updateevaluationdetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_updateevaluationdetailsRequestParameters>;

  constructor(parameters: msdyn_updateevaluationdetailsRequestParameters) {
    super("msdyn_updateevaluationdetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateevaluationdetails`;

    const body = requestBody({
      msdyn_evaluationdetails: this.Parameters.msdyn_evaluationdetails,
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

  async parseResponse(response: Response): Promise<msdyn_updateevaluationdetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_updateevaluationdetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_updateevaluationdetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_updateevaluationdetailsResult {
  "@odata.context"?: string;
  msdyn_updatestatus: boolean;
}

/**
 * msdyn_updateevaluationdetails response message
 *
 * `result` is the value the msdyn_updateevaluationdetails action returns (see {@link msdyn_updateevaluationdetailsResult}).
 */
export class msdyn_updateevaluationdetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_updateevaluationdetailsResult) {
    super("msdyn_updateevaluationdetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_updateevaluationdetailsResponse {
    return new msdyn_updateevaluationdetailsResponse(data as msdyn_updateevaluationdetailsResult);
  }
}
