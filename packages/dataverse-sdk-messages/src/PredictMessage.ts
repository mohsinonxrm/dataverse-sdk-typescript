import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PredictResponse as PredictResponseData } from "./types/index.js";

/**
 * Parameters of the Predict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictRequestParameters {
  version: string;
  request?: string;
  requestv2?: EntityReference | AnyEntityPayload;
  source?: string;
}

/**
 * Predict request message
 *
 * Web API Action: Predict
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictRequest extends OrganizationRequest implements Executable<PredictResponse> {
  declare readonly Parameters: Readonly<PredictRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: PredictRequestParameters
  ) {
    super("Predict", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.Predict`;

    const body = requestBody({
      version: this.Parameters.version,
      request: this.Parameters.request,
      requestv2: this.Parameters.requestv2,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<PredictResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PredictResponse.fromResponse({});
    return PredictResponse.fromResponse(await response.json());
  }
}

/**
 * Predict response message
 */
export class PredictResponse extends OrganizationResponse {
  constructor(public result: PredictResponseData) {
    super("Predict");
  }

  static fromResponse(data: unknown): PredictResponse {
    return new PredictResponse(responseObject<PredictResponseData>(data));
  }
}
