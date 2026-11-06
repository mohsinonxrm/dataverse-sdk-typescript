import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForRemovedFormLibrariesResponse as msdyn_CheckForRemovedFormLibrariesResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForRemovedFormLibrariesResponse> {
    const data = await response.json();
    return msdyn_CheckForRemovedFormLibrariesResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForRemovedFormLibraries response message
 */
export class msdyn_CheckForRemovedFormLibrariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForRemovedFormLibrariesResponseData) {
    super("msdyn_CheckForRemovedFormLibraries");
  }

  static fromResponse(data: unknown): msdyn_CheckForRemovedFormLibrariesResponse {
    return new msdyn_CheckForRemovedFormLibrariesResponse(
      responseObject<msdyn_CheckForRemovedFormLibrariesResponseData>(data)
    );
  }
}
