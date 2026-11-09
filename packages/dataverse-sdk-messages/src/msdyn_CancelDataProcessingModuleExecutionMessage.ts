import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CancelDataProcessingModuleExecutionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CancelDataProcessingModuleExecution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelDataProcessingModuleExecutionResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_CancelDataProcessingModuleExecution response message
 *
 * `result` is the value the msdyn_CancelDataProcessingModuleExecution action returns (see {@link msdyn_CancelDataProcessingModuleExecutionResult}).
 */
export class msdyn_CancelDataProcessingModuleExecutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CancelDataProcessingModuleExecutionResult) {
    super("msdyn_CancelDataProcessingModuleExecution");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CancelDataProcessingModuleExecutionResponse {
    return new msdyn_CancelDataProcessingModuleExecutionResponse(
      data as msdyn_CancelDataProcessingModuleExecutionResult
    );
  }
}
