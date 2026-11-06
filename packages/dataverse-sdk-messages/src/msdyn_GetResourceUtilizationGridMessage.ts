import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetResourceUtilizationGridResponse as msdyn_GetResourceUtilizationGridResponseData } from "./types/index.js";

/**
 * msdyn_GetResourceUtilizationGrid request message
 *
 * Web API Action: msdyn_GetResourceUtilizationGrid
 */
export class msdyn_GetResourceUtilizationGridRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceUtilizationGridResponse>
{
  constructor(
    public targetUtils: string,
    public resourceIds: string,
    public start: string,
    public end: string,
    public timescale: number
  ) {
    super("msdyn_GetResourceUtilizationGrid");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceUtilizationGrid`;

    const body: Record<string, unknown> = {
      TargetUtils: this.targetUtils,
      ResourceIds: this.resourceIds,
      Start: this.start,
      End: this.end,
      Timescale: this.timescale,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceUtilizationGridResponse> {
    const data = await response.json();
    return msdyn_GetResourceUtilizationGridResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetResourceUtilizationGrid response message
 */
export class msdyn_GetResourceUtilizationGridResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceUtilizationGridResponseData) {
    super("msdyn_GetResourceUtilizationGrid");
  }

  static fromResponse(data: unknown): msdyn_GetResourceUtilizationGridResponse {
    return new msdyn_GetResourceUtilizationGridResponse(
      responseObject<msdyn_GetResourceUtilizationGridResponseData>(data)
    );
  }
}
