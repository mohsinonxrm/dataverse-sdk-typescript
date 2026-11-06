import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ManageSLAInstances message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ManageSLAInstancesRequestParameters {
  SLAId: string;
  RegardingId: string;
  EntityLogicalName: string;
  Recalculate?: number;
}

/**
 * msdyn_ManageSLAInstances request message
 *
 * Web API Action: msdyn_ManageSLAInstances
 */
export class msdyn_ManageSLAInstancesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ManageSLAInstancesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ManageSLAInstancesRequestParameters>;

  constructor(parameters: msdyn_ManageSLAInstancesRequestParameters) {
    super("msdyn_ManageSLAInstances", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ManageSLAInstances`;

    const body = requestBody({
      SLAId: this.Parameters.SLAId,
      RegardingId: this.Parameters.RegardingId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Recalculate: this.Parameters.Recalculate,
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

  async parseResponse(response: Response): Promise<msdyn_ManageSLAInstancesResponse> {
    // No return value (204 No Content)
    return new msdyn_ManageSLAInstancesResponse();
  }
}

/**
 * msdyn_ManageSLAInstances response message
 */
export class msdyn_ManageSLAInstancesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ManageSLAInstances");
  }

  static fromResponse(_data: unknown): msdyn_ManageSLAInstancesResponse {
    return new msdyn_ManageSLAInstancesResponse();
  }
}
