import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse as msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled request message
 *
 * Web API Action: msdyn_CheckIfAutoRouteToOwnerQueueEnabled
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckIfAutoRouteToOwnerQueueEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoRouteToOwnerQueueEnabled`;

    const body: Record<string, unknown> = {
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
    const data = await response.json();
    return msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse.fromResponse(data);
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
