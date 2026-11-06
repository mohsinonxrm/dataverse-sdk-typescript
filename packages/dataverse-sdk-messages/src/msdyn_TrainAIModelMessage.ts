import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TrainAIModel request message
 *
 * Web API Action: msdyn_TrainAIModel
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_TrainAIModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_TrainAIModelResponse>
{
  constructor(public msdyn_ocskillidentmlmodelId: string) {
    super("msdyn_TrainAIModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_TrainAIModel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TrainAIModelResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TrainAIModelResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TrainAIModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TrainAIModelResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_TrainAIModel response message
 *
 * `result` is the value the msdyn_TrainAIModel action returns (see {@link msdyn_TrainAIModelResult}).
 */
export class msdyn_TrainAIModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_TrainAIModelResult) {
    super("msdyn_TrainAIModel");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TrainAIModelResponse {
    return new msdyn_TrainAIModelResponse(data as msdyn_TrainAIModelResult);
  }
}
