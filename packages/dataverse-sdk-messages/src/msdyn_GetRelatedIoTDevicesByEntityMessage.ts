import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRelatedIoTDevicesByEntityResponse as msdyn_GetRelatedIoTDevicesByEntityResponseData } from "./types/index.js";

/**
 * msdyn_GetRelatedIoTDevicesByEntity request message
 *
 * Web API Action: msdyn_GetRelatedIoTDevicesByEntity
 */
export class msdyn_GetRelatedIoTDevicesByEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRelatedIoTDevicesByEntityResponse>
{
  constructor(
    public entityLogicalName: string,
    public entityId: string
  ) {
    super("msdyn_GetRelatedIoTDevicesByEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedIoTDevicesByEntity`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      EntityId: this.entityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetRelatedIoTDevicesByEntityResponse> {
    const data = await response.json();
    return msdyn_GetRelatedIoTDevicesByEntityResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity response message
 */
export class msdyn_GetRelatedIoTDevicesByEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedIoTDevicesByEntityResponseData) {
    super("msdyn_GetRelatedIoTDevicesByEntity");
  }

  static fromResponse(data: unknown): msdyn_GetRelatedIoTDevicesByEntityResponse {
    return new msdyn_GetRelatedIoTDevicesByEntityResponse(
      responseObject<msdyn_GetRelatedIoTDevicesByEntityResponseData>(data)
    );
  }
}
