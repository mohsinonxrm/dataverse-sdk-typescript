import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PredictionSchemaResponse as PredictionSchemaResponseData } from "./types/index.js";

/**
 * Parameters of the PredictionSchema message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictionSchemaRequestParameters {
  version: string;
  predictionMode?: string;
}

/**
 * PredictionSchema request message
 *
 * Web API Action: PredictionSchema
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictionSchemaRequest
  extends OrganizationRequest
  implements Executable<PredictionSchemaResponse>
{
  declare readonly Parameters: Readonly<PredictionSchemaRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: PredictionSchemaRequestParameters
  ) {
    super("PredictionSchema", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictionSchema`;

    const body = requestBody({
      version: this.Parameters.version,
      predictionMode: this.Parameters.predictionMode,
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

  async parseResponse(response: Response): Promise<PredictionSchemaResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PredictionSchemaResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PredictionSchema response message
 */
export class PredictionSchemaResponse extends OrganizationResponse {
  constructor(public result: PredictionSchemaResponseData) {
    super("PredictionSchema");
  }

  static fromResponse(data: unknown): PredictionSchemaResponse {
    return new PredictionSchemaResponse(responseObject<PredictionSchemaResponseData>(data));
  }
}
