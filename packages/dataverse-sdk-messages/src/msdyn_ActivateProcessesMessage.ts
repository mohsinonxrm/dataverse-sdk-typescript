import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_ActivateProcessesResponse as msdyn_ActivateProcessesResponseData } from "./types/index.js";

/**
 * msdyn_ActivateProcesses request message
 *
 * Web API Action: msdyn_ActivateProcesses
 */
export class msdyn_ActivateProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateProcessesResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_ActivateProcesses");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    const data = await response.json();
    return msdyn_ActivateProcessesResponse.fromResponse(data);
  }
}

/**
 * msdyn_ActivateProcesses response message
 */
export class msdyn_ActivateProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateProcessesResponseData) {
    super("msdyn_ActivateProcesses");
  }

  static fromResponse(data: unknown): msdyn_ActivateProcessesResponse {
    return new msdyn_ActivateProcessesResponse(
      responseObject<msdyn_ActivateProcessesResponseData>(data)
    );
  }
}
