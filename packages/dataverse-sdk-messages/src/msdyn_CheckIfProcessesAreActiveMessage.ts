import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfProcessesAreActiveResponse as msdyn_CheckIfProcessesAreActiveResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfProcessesAreActive message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfProcessesAreActiveRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckIfProcessesAreActive request message
 *
 * Web API Action: msdyn_CheckIfProcessesAreActive
 */
export class msdyn_CheckIfProcessesAreActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfProcessesAreActiveResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfProcessesAreActiveRequestParameters>;

  constructor(parameters: msdyn_CheckIfProcessesAreActiveRequestParameters = {}) {
    super("msdyn_CheckIfProcessesAreActive", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesAreActive`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckIfProcessesAreActiveResponse.fromResponse({});
    return msdyn_CheckIfProcessesAreActiveResponse.fromResponse(await response.json());
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
