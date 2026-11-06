import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_StoreSimulationResultResponse as msdyn_StoreSimulationResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_StoreSimulationResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StoreSimulationResultRequestParameters {
  EvaluationInsight: string;
  SimulationContext: string;
  EvaluationCriteria?: string;
}

/**
 * msdyn_StoreSimulationResult request message
 *
 * Web API Action: msdyn_StoreSimulationResult
 */
export class msdyn_StoreSimulationResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_StoreSimulationResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_StoreSimulationResultRequestParameters>;

  constructor(parameters: msdyn_StoreSimulationResultRequestParameters) {
    super("msdyn_StoreSimulationResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreSimulationResult`;

    const body = requestBody({
      EvaluationInsight: this.Parameters.EvaluationInsight,
      SimulationContext: this.Parameters.SimulationContext,
      EvaluationCriteria: this.Parameters.EvaluationCriteria,
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

  async parseResponse(response: Response): Promise<msdyn_StoreSimulationResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_StoreSimulationResultResponse.fromResponse({});
    return msdyn_StoreSimulationResultResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_StoreSimulationResult response message
 */
export class msdyn_StoreSimulationResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_StoreSimulationResultResponseData) {
    super("msdyn_StoreSimulationResult");
  }

  static fromResponse(data: unknown): msdyn_StoreSimulationResultResponse {
    return new msdyn_StoreSimulationResultResponse(
      responseObject<msdyn_StoreSimulationResultResponseData>(data)
    );
  }
}
