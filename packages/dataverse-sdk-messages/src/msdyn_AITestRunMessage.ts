import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AITestRun request message
 *
 * Web API Action: msdyn_AITestRun
 */
export class msdyn_AITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_AITestRunResponse>
{
  constructor(
    public msdyn_aitestcaseId: string,
    public request: string
  ) {
    super("msdyn_AITestRun");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${this.msdyn_aitestcaseId})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    const data = await response.json();
    return msdyn_AITestRunResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aitestcaseId,
      request: this.request,
    };
  }
}

/**
 * msdyn_AITestRun response message
 */
export class msdyn_AITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_AITestRunResponse) {
    super("msdyn_AITestRun");
  }

  static fromResponse(data: unknown): msdyn_AITestRunResponse {
    return new msdyn_AITestRunResponse((data as any).value);
  }
}
