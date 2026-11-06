import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RecoverOptimizeLeasesResponse as msdyn_RecoverOptimizeLeasesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RecoverOptimizeLeases message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecoverOptimizeLeasesRequestParameters {
  WorkflowRunId?: string;
  LeaseOwner?: string;
  MaxItems?: number;
}

/**
 * msdyn_RecoverOptimizeLeases request message
 *
 * Web API Action: msdyn_RecoverOptimizeLeases
 */
export class msdyn_RecoverOptimizeLeasesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecoverOptimizeLeasesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RecoverOptimizeLeasesRequestParameters>;

  constructor(parameters: msdyn_RecoverOptimizeLeasesRequestParameters = {}) {
    super("msdyn_RecoverOptimizeLeases", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecoverOptimizeLeases`;

    const body = requestBody({
      WorkflowRunId: this.Parameters.WorkflowRunId,
      LeaseOwner: this.Parameters.LeaseOwner,
      MaxItems: this.Parameters.MaxItems,
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

  async parseResponse(response: Response): Promise<msdyn_RecoverOptimizeLeasesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RecoverOptimizeLeasesResponse.fromResponse({});
    return msdyn_RecoverOptimizeLeasesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RecoverOptimizeLeases response message
 */
export class msdyn_RecoverOptimizeLeasesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecoverOptimizeLeasesResponseData) {
    super("msdyn_RecoverOptimizeLeases");
  }

  static fromResponse(data: unknown): msdyn_RecoverOptimizeLeasesResponse {
    return new msdyn_RecoverOptimizeLeasesResponse(
      responseObject<msdyn_RecoverOptimizeLeasesResponseData>(data)
    );
  }
}
