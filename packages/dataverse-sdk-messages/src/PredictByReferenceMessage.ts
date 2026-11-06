import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PredictByReferenceResponse as PredictByReferenceResponseData } from "./types/index.js";

/**
 * Parameters of the PredictByReference message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PredictByReferenceRequestParameters {
  version: string;
  targetRecordId: string;
}

/**
 * PredictByReference request message
 *
 * Web API Action: PredictByReference
 *
 * The first argument is the id of the msdyn_aimodel record to call it on.
 */
export class PredictByReferenceRequest
  extends OrganizationRequest
  implements Executable<PredictByReferenceResponse>
{
  declare readonly Parameters: Readonly<PredictByReferenceRequestParameters>;

  constructor(
    public msdyn_aimodelId: string,
    parameters: PredictByReferenceRequestParameters
  ) {
    super("PredictByReference", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aimodels(${this.msdyn_aimodelId})/Microsoft.Dynamics.CRM.PredictByReference`;

    const body = requestBody({
      version: this.Parameters.version,
      targetRecordId: this.Parameters.targetRecordId,
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

  async parseResponse(response: Response): Promise<PredictByReferenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PredictByReferenceResponse.fromResponse({});
    return PredictByReferenceResponse.fromResponse(await response.json());
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
