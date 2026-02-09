import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForRemovedFormLibraries request message
 *
 * Web API Action: msdyn_CheckForRemovedFormLibraries
 */
export class msdyn_CheckForRemovedFormLibrariesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRemovedFormLibrariesResponse>
{
  constructor(
    public solutionId: string,
    public excludeFormIds: string
  ) {
    super("msdyn_CheckForRemovedFormLibraries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRemovedFormLibraries`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForRemovedFormLibrariesResponse> {
    const data = await response.json();
    return msdyn_CheckForRemovedFormLibrariesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
    };
  }
}

/**
 * msdyn_CheckForRemovedFormLibraries response message
 */
export class msdyn_CheckForRemovedFormLibrariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForRemovedFormLibrariesResponse) {
    super("msdyn_CheckForRemovedFormLibraries");
  }

  static fromResponse(data: unknown): msdyn_CheckForRemovedFormLibrariesResponse {
    return new msdyn_CheckForRemovedFormLibrariesResponse((data as any).value);
  }
}
