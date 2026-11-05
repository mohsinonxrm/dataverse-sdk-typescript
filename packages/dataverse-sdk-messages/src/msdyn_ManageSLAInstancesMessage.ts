import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ManageSLAInstances request message
 *
 * Web API Action: msdyn_ManageSLAInstances
 */
export class msdyn_ManageSLAInstancesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ManageSLAInstancesResponse>
{
  constructor(
    public sLAId: string,
    public regardingId: string,
    public entityLogicalName: string,
    public recalculate: number
  ) {
    super("msdyn_ManageSLAInstances");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ManageSLAInstances`;

    const body: Record<string, unknown> = {
      SLAId: this.sLAId,
      RegardingId: this.regardingId,
      EntityLogicalName: this.entityLogicalName,
      Recalculate: this.recalculate,
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

  async parseResponse(response: Response): Promise<msdyn_ManageSLAInstancesResponse> {
    // No return value (204 No Content)
    return new msdyn_ManageSLAInstancesResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SLAId: this.sLAId,
      RegardingId: this.regardingId,
      EntityLogicalName: this.entityLogicalName,
      Recalculate: this.recalculate,
    };
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
