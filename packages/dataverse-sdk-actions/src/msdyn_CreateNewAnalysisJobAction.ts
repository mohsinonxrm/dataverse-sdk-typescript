import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * Response from msdyn_CreateNewAnalysisJob action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_CreateNewAnalysisJobResponse extends msdyn_analysisjob {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * msdyn_CreateNewAnalysisJob action
 *
 * Unbound action
 */
export class msdyn_CreateNewAnalysisJobAction implements Executable<msdyn_CreateNewAnalysisJobResponse> {
  constructor(public readonly componentInstances: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJob`;

    const body: Record<string, unknown> = {
      ComponentInstances: this.componentInstances,
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

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobResponse> {
    const data = await response.json();
    return data as msdyn_CreateNewAnalysisJobResponse;
  }
}
