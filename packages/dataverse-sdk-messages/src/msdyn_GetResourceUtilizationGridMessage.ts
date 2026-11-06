import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourceUtilizationGridResponse as msdyn_GetResourceUtilizationGridResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetResourceUtilizationGrid message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceUtilizationGridRequestParameters {
  TargetUtils: string;
  ResourceIds: string;
  Start: string;
  End: string;
  Timescale: number;
}

/**
 * msdyn_GetResourceUtilizationGrid request message
 *
 * Web API Action: msdyn_GetResourceUtilizationGrid
 */
export class msdyn_GetResourceUtilizationGridRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceUtilizationGridResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceUtilizationGridRequestParameters>;

  constructor(parameters: msdyn_GetResourceUtilizationGridRequestParameters) {
    super("msdyn_GetResourceUtilizationGrid", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceUtilizationGrid`;

    const body = requestBody({
      TargetUtils: this.Parameters.TargetUtils,
      ResourceIds: this.Parameters.ResourceIds,
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      Timescale: this.Parameters.Timescale,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceUtilizationGridResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetResourceUtilizationGridResponse.fromResponse(text ? JSON.parse(text) : {});
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
