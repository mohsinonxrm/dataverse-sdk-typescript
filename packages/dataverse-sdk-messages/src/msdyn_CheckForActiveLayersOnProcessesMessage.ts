import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForActiveLayersOnProcessesResponse as msdyn_CheckForActiveLayersOnProcessesResponseData } from "./types/index.js";

/**
 * msdyn_CheckForActiveLayersOnProcesses request message
 *
 * Web API Action: msdyn_CheckForActiveLayersOnProcesses
 */
export class msdyn_CheckForActiveLayersOnProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForActiveLayersOnProcessesResponse>
{
  constructor(
    public solutionId: string,
    public excludeFormIds: string
  ) {
    super("msdyn_CheckForActiveLayersOnProcesses");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveLayersOnProcesses`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForActiveLayersOnProcessesResponse> {
    const data = await response.json();
    return msdyn_CheckForActiveLayersOnProcessesResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForActiveLayersOnProcesses response message
 */
export class msdyn_CheckForActiveLayersOnProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForActiveLayersOnProcessesResponseData) {
    super("msdyn_CheckForActiveLayersOnProcesses");
  }

  static fromResponse(data: unknown): msdyn_CheckForActiveLayersOnProcessesResponse {
    return new msdyn_CheckForActiveLayersOnProcessesResponse(
      responseObject<msdyn_CheckForActiveLayersOnProcessesResponseData>(data)
    );
  }
}
