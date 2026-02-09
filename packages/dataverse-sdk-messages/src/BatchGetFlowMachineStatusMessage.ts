import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * BatchGetFlowMachineStatus request message
 *
 * Web API Action: BatchGetFlowMachineStatus
 */
export class BatchGetFlowMachineStatusRequest
  extends OrganizationRequest
  implements Executable<BatchGetFlowMachineStatusResponse>
{
  constructor(
    public machineIds: string,
    public version: string
  ) {
    super("BatchGetFlowMachineStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BatchGetFlowMachineStatus`;

    const body: Record<string, unknown> = {
      machineIds: this.machineIds,
      version: this.version,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BatchGetFlowMachineStatusResponse> {
    const data = await response.json();
    return BatchGetFlowMachineStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      machineIds: this.machineIds,
      version: this.version,
    };
  }
}

/**
 * BatchGetFlowMachineStatus response message
 */
export class BatchGetFlowMachineStatusResponse extends OrganizationResponse {
  constructor(public result: BatchGetFlowMachineStatusResponse) {
    super("BatchGetFlowMachineStatus");
  }

  static fromResponse(data: unknown): BatchGetFlowMachineStatusResponse {
    return new BatchGetFlowMachineStatusResponse((data as any).value);
  }
}
