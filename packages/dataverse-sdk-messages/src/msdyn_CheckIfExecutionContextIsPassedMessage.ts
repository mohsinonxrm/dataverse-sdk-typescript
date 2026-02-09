import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfExecutionContextIsPassed request message
 *
 * Web API Action: msdyn_CheckIfExecutionContextIsPassed
 */
export class msdyn_CheckIfExecutionContextIsPassedRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfExecutionContextIsPassedResponse>
{
  constructor(
    public solutionId: string,
    public excludeFormIds: string
  ) {
    super("msdyn_CheckIfExecutionContextIsPassed");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfExecutionContextIsPassed`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfExecutionContextIsPassedResponse> {
    const data = await response.json();
    return msdyn_CheckIfExecutionContextIsPassedResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
    };
  }
}

/**
 * msdyn_CheckIfExecutionContextIsPassed response message
 */
export class msdyn_CheckIfExecutionContextIsPassedResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfExecutionContextIsPassedResponse) {
    super("msdyn_CheckIfExecutionContextIsPassed");
  }

  static fromResponse(data: unknown): msdyn_CheckIfExecutionContextIsPassedResponse {
    return new msdyn_CheckIfExecutionContextIsPassedResponse((data as any).value);
  }
}
