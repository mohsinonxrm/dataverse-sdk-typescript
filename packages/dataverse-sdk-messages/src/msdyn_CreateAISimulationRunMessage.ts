import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateAISimulationRunResponse as msdyn_CreateAISimulationRunResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateAISimulationRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAISimulationRunRequestParameters {
  RecordIds?: string;
  SimulationInputFile?: string;
  EntityLogicalName: string;
  SimulationCriteria?: string;
  ConditionExpressionXml?: string;
  SimulationArea?: string;
  SimulationScenarios?: string;
  Name: string;
  Mode: string;
}

/**
 * msdyn_CreateAISimulationRun request message
 *
 * Web API Action: msdyn_CreateAISimulationRun
 */
export class msdyn_CreateAISimulationRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAISimulationRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAISimulationRunRequestParameters>;

  constructor(parameters: msdyn_CreateAISimulationRunRequestParameters) {
    super("msdyn_CreateAISimulationRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAISimulationRun`;

    const body = requestBody({
      RecordIds: this.Parameters.RecordIds,
      SimulationInputFile: this.Parameters.SimulationInputFile,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      SimulationCriteria: this.Parameters.SimulationCriteria,
      ConditionExpressionXml: this.Parameters.ConditionExpressionXml,
      SimulationArea: this.Parameters.SimulationArea,
      SimulationScenarios: this.Parameters.SimulationScenarios,
      Name: this.Parameters.Name,
      Mode: this.Parameters.Mode,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAISimulationRunResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateAISimulationRunResponse.fromResponse({});
    return msdyn_CreateAISimulationRunResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateAISimulationRun response message
 */
export class msdyn_CreateAISimulationRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAISimulationRunResponseData) {
    super("msdyn_CreateAISimulationRun");
  }

  static fromResponse(data: unknown): msdyn_CreateAISimulationRunResponse {
    return new msdyn_CreateAISimulationRunResponse(
      responseObject<msdyn_CreateAISimulationRunResponseData>(data)
    );
  }
}
