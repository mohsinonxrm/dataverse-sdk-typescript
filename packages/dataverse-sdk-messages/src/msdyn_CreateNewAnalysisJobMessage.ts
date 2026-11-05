import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * msdyn_CreateNewAnalysisJob request message
 *
 * Web API Action: msdyn_CreateNewAnalysisJob
 */
export class msdyn_CreateNewAnalysisJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateNewAnalysisJobResponse>
{
  constructor(public componentInstances: Record<string, unknown>[]) {
    super("msdyn_CreateNewAnalysisJob");
  }

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
    return msdyn_CreateNewAnalysisJobResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ComponentInstances: this.componentInstances,
    };
  }
}

/**
 * msdyn_CreateNewAnalysisJob response message
 */
export class msdyn_CreateNewAnalysisJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_analysisjob) {
    super("msdyn_CreateNewAnalysisJob");
  }

  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobResponse {
    return new msdyn_CreateNewAnalysisJobResponse((data as any).value);
  }
}
