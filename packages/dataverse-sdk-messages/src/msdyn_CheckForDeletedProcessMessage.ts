import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForDeletedProcessResponse as msdyn_CheckForDeletedProcessResponseData } from "./types/index.js";

/**
 * msdyn_CheckForDeletedProcess request message
 *
 * Web API Action: msdyn_CheckForDeletedProcess
 */
export class msdyn_CheckForDeletedProcessRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedProcessResponse>
{
  constructor(
    public entityIds: string,
    public solutionId: string
  ) {
    super("msdyn_CheckForDeletedProcess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedProcess`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedProcessResponse> {
    const data = await response.json();
    return msdyn_CheckForDeletedProcessResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForDeletedProcess response message
 */
export class msdyn_CheckForDeletedProcessResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedProcessResponseData) {
    super("msdyn_CheckForDeletedProcess");
  }

  static fromResponse(data: unknown): msdyn_CheckForDeletedProcessResponse {
    return new msdyn_CheckForDeletedProcessResponse(
      responseObject<msdyn_CheckForDeletedProcessResponseData>(data)
    );
  }
}
