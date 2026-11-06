import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PredictByReferenceResponse as PredictByReferenceResponseData } from "./types/index.js";

/**
 * PredictByReference request message
 *
 * Web API Action: PredictByReference
 */
export class PredictByReferenceRequest
  extends OrganizationRequest
  implements Executable<PredictByReferenceResponse>
{
  constructor(
    public msdyn_aimodelId: string,
    public version: string,
    public targetRecordId: string
  ) {
    super("PredictByReference");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictByReference`;

    const body: Record<string, unknown> = {
      version: this.version,
      targetRecordId: this.targetRecordId,
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

  async parseResponse(response: Response): Promise<PredictByReferenceResponse> {
    const data = await response.json();
    return PredictByReferenceResponse.fromResponse(data);
  }
}

/**
 * PredictByReference response message
 */
export class PredictByReferenceResponse extends OrganizationResponse {
  constructor(public result: PredictByReferenceResponseData) {
    super("PredictByReference");
  }

  static fromResponse(data: unknown): PredictByReferenceResponse {
    return new PredictByReferenceResponse(responseObject<PredictByReferenceResponseData>(data));
  }
}
