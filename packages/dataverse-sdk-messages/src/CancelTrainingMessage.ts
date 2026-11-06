import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CancelTrainingResponse as CancelTrainingResponseData } from "./types/index.js";

/**
 * Parameters of the CancelTraining message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CancelTrainingRequestParameters {
  version: string;
}

/**
 * CancelTraining request message
 *
 * Web API Action: CancelTraining
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class CancelTrainingRequest
  extends OrganizationRequest
  implements Executable<CancelTrainingResponse>
{
  declare readonly Parameters: Readonly<CancelTrainingRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: CancelTrainingRequestParameters
  ) {
    super("CancelTraining", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.CancelTraining`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<CancelTrainingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CancelTrainingResponse.fromResponse({});
    return CancelTrainingResponse.fromResponse(await response.json());
  }
}

/**
 * CancelTraining response message
 */
export class CancelTrainingResponse extends OrganizationResponse {
  constructor(public result: CancelTrainingResponseData) {
    super("CancelTraining");
  }

  static fromResponse(data: unknown): CancelTrainingResponse {
    return new CancelTrainingResponse(responseObject<CancelTrainingResponseData>(data));
  }
}
