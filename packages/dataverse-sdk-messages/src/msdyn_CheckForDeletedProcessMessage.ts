import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForDeletedProcessResponse as msdyn_CheckForDeletedProcessResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForDeletedProcess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedProcessRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckForDeletedProcess request message
 *
 * Web API Action: msdyn_CheckForDeletedProcess
 */
export class msdyn_CheckForDeletedProcessRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedProcessResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDeletedProcessRequestParameters>;

  constructor(parameters: msdyn_CheckForDeletedProcessRequestParameters = {}) {
    super("msdyn_CheckForDeletedProcess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedProcess`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedProcessResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForDeletedProcessResponse.fromResponse({});
    return msdyn_CheckForDeletedProcessResponse.fromResponse(await response.json());
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
