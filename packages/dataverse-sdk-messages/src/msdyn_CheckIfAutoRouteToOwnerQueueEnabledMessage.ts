import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse as msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfAutoRouteToOwnerQueueEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled request message
 *
 * Web API Action: msdyn_CheckIfAutoRouteToOwnerQueueEnabled
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters>;

  constructor(parameters: msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequestParameters = {}) {
    super("msdyn_CheckIfAutoRouteToOwnerQueueEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoRouteToOwnerQueueEnabled`;

    const body = requestBody({
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse.fromResponse({});
    return msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled response message
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponseData) {
    super("msdyn_CheckIfAutoRouteToOwnerQueueEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse {
    return new msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse(
      responseObject<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponseData>(data)
    );
  }
}
