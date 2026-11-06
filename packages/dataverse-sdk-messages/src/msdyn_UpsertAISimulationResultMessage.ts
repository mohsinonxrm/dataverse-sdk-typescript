import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpsertAISimulationResultResponse as msdyn_UpsertAISimulationResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpsertAISimulationResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertAISimulationResultRequestParameters {
  SimulationResultId?: string;
  SimulationStatus: string;
  SimulationScenario: string;
  SimulationRunId?: string;
  IntentFamilyId?: string;
  SimulationResultDetail?: string;
  RecordId: string;
  EntityLogicalName?: string;
}

/**
 * msdyn_UpsertAISimulationResult request message
 *
 * Web API Action: msdyn_UpsertAISimulationResult
 */
export class msdyn_UpsertAISimulationResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpsertAISimulationResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpsertAISimulationResultRequestParameters>;

  constructor(parameters: msdyn_UpsertAISimulationResultRequestParameters) {
    super("msdyn_UpsertAISimulationResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertAISimulationResult`;

    const body = requestBody({
      SimulationResultId: this.Parameters.SimulationResultId,
      SimulationStatus: this.Parameters.SimulationStatus,
      SimulationScenario: this.Parameters.SimulationScenario,
      SimulationRunId: this.Parameters.SimulationRunId,
      IntentFamilyId: this.Parameters.IntentFamilyId,
      SimulationResultDetail: this.Parameters.SimulationResultDetail,
      RecordId: this.Parameters.RecordId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertAISimulationResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpsertAISimulationResultResponse.fromResponse({});
    return msdyn_UpsertAISimulationResultResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpsertAISimulationResult response message
 */
export class msdyn_UpsertAISimulationResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpsertAISimulationResultResponseData) {
    super("msdyn_UpsertAISimulationResult");
  }

  static fromResponse(data: unknown): msdyn_UpsertAISimulationResultResponse {
    return new msdyn_UpsertAISimulationResultResponse(
      responseObject<msdyn_UpsertAISimulationResultResponseData>(data)
    );
  }
}
