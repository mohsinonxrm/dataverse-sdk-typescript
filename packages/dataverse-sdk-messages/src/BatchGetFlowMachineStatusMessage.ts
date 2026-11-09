import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return BatchGetFlowMachineStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BatchGetFlowMachineStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BatchGetFlowMachineStatusResult {
  "@odata.context"?: string;
  machineStatuses: string;
}

/**
 * BatchGetFlowMachineStatus response message
 *
 * `result` is the value the BatchGetFlowMachineStatus action returns (see {@link BatchGetFlowMachineStatusResult}).
 */
export class BatchGetFlowMachineStatusResponse extends OrganizationResponse {
  constructor(public result: BatchGetFlowMachineStatusResult) {
    super("BatchGetFlowMachineStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BatchGetFlowMachineStatusResponse {
    return new BatchGetFlowMachineStatusResponse(data as BatchGetFlowMachineStatusResult);
  }
}
