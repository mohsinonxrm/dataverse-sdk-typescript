import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForPendingProcesses request message
 *
 * Web API Action: msdyn_CheckForPendingProcesses
 */
export class msdyn_CheckForPendingProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForPendingProcessesResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckForPendingProcesses");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForPendingProcesses`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForPendingProcessesResponse> {
    const data = await response.json();
    return msdyn_CheckForPendingProcessesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForPendingProcesses response message
 */
export class msdyn_CheckForPendingProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForPendingProcessesResponse) {
    super("msdyn_CheckForPendingProcesses");
  }

  static fromResponse(data: unknown): msdyn_CheckForPendingProcessesResponse {
    return new msdyn_CheckForPendingProcessesResponse((data as any).value);
  }
}
