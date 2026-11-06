import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFieldEvidenceResponse as msdyn_GetFieldEvidenceResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFieldEvidence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFieldEvidenceRequestParameters {
  msdyn_PreviousDescription?: string;
  msdyn_CorrelationId?: string;
  msdyn_RunId?: string;
  msdyn_aidescriptioncandidate: string;
  msdyn_SimulationId?: string;
}

/**
 * msdyn_GetFieldEvidence request message
 *
 * Web API Action: msdyn_GetFieldEvidence
 */
export class msdyn_GetFieldEvidenceRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFieldEvidenceResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFieldEvidenceRequestParameters>;

  constructor(parameters: msdyn_GetFieldEvidenceRequestParameters) {
    super("msdyn_GetFieldEvidence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldEvidence`;

    const body = requestBody({
      msdyn_PreviousDescription: this.Parameters.msdyn_PreviousDescription,
      msdyn_CorrelationId: this.Parameters.msdyn_CorrelationId,
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_aidescriptioncandidate: this.Parameters.msdyn_aidescriptioncandidate,
      msdyn_SimulationId: this.Parameters.msdyn_SimulationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetFieldEvidenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFieldEvidenceResponse.fromResponse({});
    return msdyn_GetFieldEvidenceResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFieldEvidence response message
 */
export class msdyn_GetFieldEvidenceResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFieldEvidenceResponseData) {
    super("msdyn_GetFieldEvidence");
  }

  static fromResponse(data: unknown): msdyn_GetFieldEvidenceResponse {
    return new msdyn_GetFieldEvidenceResponse(
      responseObject<msdyn_GetFieldEvidenceResponseData>(data)
    );
  }
}
