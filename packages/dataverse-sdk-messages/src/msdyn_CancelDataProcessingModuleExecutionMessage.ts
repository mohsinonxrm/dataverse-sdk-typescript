import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CancelDataProcessingModuleExecutionResponse as msdyn_CancelDataProcessingModuleExecutionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CancelDataProcessingModuleExecution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelDataProcessingModuleExecutionRequestParameters {
  DataProcessingRequest: string;
}

/**
 * msdyn_CancelDataProcessingModuleExecution request message
 *
 * Web API Action: msdyn_CancelDataProcessingModuleExecution
 */
export class msdyn_CancelDataProcessingModuleExecutionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CancelDataProcessingModuleExecutionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CancelDataProcessingModuleExecutionRequestParameters>;

  constructor(parameters: msdyn_CancelDataProcessingModuleExecutionRequestParameters) {
    super("msdyn_CancelDataProcessingModuleExecution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelDataProcessingModuleExecution`;

    const body = requestBody({
      DataProcessingRequest: this.Parameters.DataProcessingRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CancelDataProcessingModuleExecutionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CancelDataProcessingModuleExecutionResponse.fromResponse({});
    return msdyn_CancelDataProcessingModuleExecutionResponse.fromResponse(await response.json());
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
