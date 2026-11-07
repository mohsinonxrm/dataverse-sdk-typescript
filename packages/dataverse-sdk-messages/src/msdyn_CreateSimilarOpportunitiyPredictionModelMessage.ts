import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateSimilarOpportunitiyPredictionModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSimilarOpportunitiyPredictionModelRequestParameters {
  ModelState?: string;
}

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel request message
 *
 * Web API Action: msdyn_CreateSimilarOpportunitiyPredictionModel
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSimilarOpportunitiyPredictionModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSimilarOpportunitiyPredictionModelRequestParameters>;

  constructor(parameters: msdyn_CreateSimilarOpportunitiyPredictionModelRequestParameters = {}) {
    super("msdyn_CreateSimilarOpportunitiyPredictionModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSimilarOpportunitiyPredictionModel`;

    const body = requestBody({
      ModelState: this.Parameters.ModelState,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CreateSimilarOpportunitiyPredictionModelResponse());
  }
}

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel response message
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateSimilarOpportunitiyPredictionModel");
  }

  static fromResponse(_data?: unknown): msdyn_CreateSimilarOpportunitiyPredictionModelResponse {
    return new msdyn_CreateSimilarOpportunitiyPredictionModelResponse();
  }
}
