import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetPredictionModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPredictionModelStatusRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetPredictionModelStatus request message
 *
 * Web API Action: msdyn_GetPredictionModelStatus
 */
export class msdyn_GetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPredictionModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetPredictionModelStatusRequestParameters>;

  constructor(parameters: msdyn_GetPredictionModelStatusRequestParameters = {}) {
    super("msdyn_GetPredictionModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPredictionModelStatus`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetPredictionModelStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetPredictionModelStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPredictionModelStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPredictionModelStatusResult {
  "@odata.context"?: string;
  PredictionModelStatus: string;
}

/**
 * msdyn_GetPredictionModelStatus response message
 *
 * `result` is the value the msdyn_GetPredictionModelStatus action returns (see {@link msdyn_GetPredictionModelStatusResult}).
 */
export class msdyn_GetPredictionModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPredictionModelStatusResult) {
    super("msdyn_GetPredictionModelStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPredictionModelStatusResponse {
    return new msdyn_GetPredictionModelStatusResponse(data as msdyn_GetPredictionModelStatusResult);
  }
}
