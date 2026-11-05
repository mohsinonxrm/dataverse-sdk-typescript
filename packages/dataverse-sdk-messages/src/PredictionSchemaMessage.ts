import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PredictionSchemaResponse as PredictionSchemaResponseData } from "./types/index.js";

/**
 * PredictionSchema request message
 *
 * Web API Action: PredictionSchema
 */
export class PredictionSchemaRequest
  extends OrganizationRequest
  implements Executable<PredictionSchemaResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public version: string,
    public predictionMode: string
  ) {
    super("PredictionSchema");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictionSchema`;

    const body: Record<string, unknown> = {
      version: this.version,
      predictionMode: this.predictionMode,
    };

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
    const data = await response.json();
    return PredictionSchemaResponse.fromResponse(data);
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
