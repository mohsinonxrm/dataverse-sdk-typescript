import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfProcessesAreActiveResponse as msdyn_CheckIfProcessesAreActiveResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfProcessesAreActive request message
 *
 * Web API Action: msdyn_CheckIfProcessesAreActive
 */
export class msdyn_CheckIfProcessesAreActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfProcessesAreActiveResponse>
{
  constructor(
    public entityIds?: string,
    public solutionId?: string
  ) {
    super("msdyn_CheckIfProcessesAreActive");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesAreActive`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfProcessesAreActiveResponse> {
    const data = await response.json();
    return msdyn_CheckIfProcessesAreActiveResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfProcessesAreActive response message
 */
export class msdyn_CheckIfProcessesAreActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfProcessesAreActiveResponseData) {
    super("msdyn_CheckIfProcessesAreActive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfProcessesAreActiveResponse {
    return new msdyn_CheckIfProcessesAreActiveResponse(
      responseObject<msdyn_CheckIfProcessesAreActiveResponseData>(data)
    );
  }
}
