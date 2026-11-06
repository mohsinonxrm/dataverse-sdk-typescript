import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TrainEffortModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TrainEffortModelRequestParameters {
  TrainConfig: string;
}

/**
 * msdyn_TrainEffortModel request message
 *
 * Web API Action: msdyn_TrainEffortModel
 */
export class msdyn_TrainEffortModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainEffortModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_TrainEffortModelRequestParameters>;

  constructor(parameters: msdyn_TrainEffortModelRequestParameters) {
    super("msdyn_TrainEffortModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrainEffortModel`;

    const body = requestBody({
      TrainConfig: this.Parameters.TrainConfig,
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

  async parseResponse(response: Response): Promise<msdyn_TrainEffortModelResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TrainEffortModelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TrainEffortModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TrainEffortModelResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_TrainEffortModel response message
 *
 * `result` is the value the msdyn_TrainEffortModel action returns (see {@link msdyn_TrainEffortModelResult}).
 */
export class msdyn_TrainEffortModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrainEffortModelResult) {
    super("msdyn_TrainEffortModel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TrainEffortModelResponse {
    return new msdyn_TrainEffortModelResponse(data as msdyn_TrainEffortModelResult);
  }
}
