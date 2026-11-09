import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSGetPredictionModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetPredictionModelStatusRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetPredictionModelStatus request message
 *
 * Web API Action: msdyn_OSGetPredictionModelStatus
 */
export class msdyn_OSGetPredictionModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetPredictionModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSGetPredictionModelStatusRequestParameters>;

  constructor(parameters: msdyn_OSGetPredictionModelStatusRequestParameters = {}) {
    super("msdyn_OSGetPredictionModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetPredictionModelStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OSGetPredictionModelStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OSGetPredictionModelStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetPredictionModelStatusResult {
  "@odata.context"?: string;
  PredictionModelStatus: string;
}

/**
 * msdyn_OSGetPredictionModelStatus response message
 *
 * `result` is the value the msdyn_OSGetPredictionModelStatus action returns (see {@link msdyn_OSGetPredictionModelStatusResult}).
 */
export class msdyn_OSGetPredictionModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetPredictionModelStatusResult) {
    super("msdyn_OSGetPredictionModelStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OSGetPredictionModelStatusResponse {
    return new msdyn_OSGetPredictionModelStatusResponse(
      data as msdyn_OSGetPredictionModelStatusResult
    );
  }
}
