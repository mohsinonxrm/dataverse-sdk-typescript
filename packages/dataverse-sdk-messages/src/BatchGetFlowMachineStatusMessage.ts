import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { BatchGetFlowMachineStatusResponse as BatchGetFlowMachineStatusResponseData } from "./types/index.js";

/**
 * Parameters of the BatchGetFlowMachineStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BatchGetFlowMachineStatusRequestParameters {
  machineIds: string;
  version?: string;
}

/**
 * BatchGetFlowMachineStatus request message
 *
 * Web API Action: BatchGetFlowMachineStatus
 */
export class BatchGetFlowMachineStatusRequest
  extends OrganizationRequest
  implements Executable<BatchGetFlowMachineStatusResponse>
{
  declare readonly Parameters: Readonly<BatchGetFlowMachineStatusRequestParameters>;

  constructor(parameters: BatchGetFlowMachineStatusRequestParameters) {
    super("BatchGetFlowMachineStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BatchGetFlowMachineStatus`;

    const body = requestBody({
      machineIds: this.Parameters.machineIds,
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

  async parseResponse(response: Response): Promise<BatchGetFlowMachineStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return BatchGetFlowMachineStatusResponse.fromResponse({});
    return BatchGetFlowMachineStatusResponse.fromResponse(await response.json());
  }
}

/**
 * BatchGetFlowMachineStatus response message
 */
export class BatchGetFlowMachineStatusResponse extends OrganizationResponse {
  constructor(public result: BatchGetFlowMachineStatusResponseData) {
    super("BatchGetFlowMachineStatus");
  }

  static fromResponse(data: unknown): BatchGetFlowMachineStatusResponse {
    return new BatchGetFlowMachineStatusResponse(
      responseObject<BatchGetFlowMachineStatusResponseData>(data)
    );
  }
}
