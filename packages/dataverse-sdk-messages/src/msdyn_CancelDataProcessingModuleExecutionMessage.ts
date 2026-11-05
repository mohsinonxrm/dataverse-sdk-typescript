import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CancelDataProcessingModuleExecutionResponse as msdyn_CancelDataProcessingModuleExecutionResponseData } from "./types/index.js";

/**
 * msdyn_CancelDataProcessingModuleExecution request message
 *
 * Web API Action: msdyn_CancelDataProcessingModuleExecution
 */
export class msdyn_CancelDataProcessingModuleExecutionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelDataProcessingModuleExecutionResponse>
{
  constructor(public dataProcessingRequest: string) {
    super("msdyn_CancelDataProcessingModuleExecution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelDataProcessingModuleExecution`;

    const body: Record<string, unknown> = {
      DataProcessingRequest: this.dataProcessingRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CancelDataProcessingModuleExecutionResponse> {
    const data = await response.json();
    return msdyn_CancelDataProcessingModuleExecutionResponse.fromResponse(data);
  }
}

/**
 * msdyn_CancelDataProcessingModuleExecution response message
 */
export class msdyn_CancelDataProcessingModuleExecutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelDataProcessingModuleExecutionResponseData) {
    super("msdyn_CancelDataProcessingModuleExecution");
  }

  static fromResponse(data: unknown): msdyn_CancelDataProcessingModuleExecutionResponse {
    return new msdyn_CancelDataProcessingModuleExecutionResponse(
      responseObject<msdyn_CancelDataProcessingModuleExecutionResponseData>(data)
    );
  }
}
