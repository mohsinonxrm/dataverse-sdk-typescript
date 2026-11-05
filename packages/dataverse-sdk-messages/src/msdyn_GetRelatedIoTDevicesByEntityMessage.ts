import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
      EntityId: this.entityId,
    };
  }
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity response message
 */
export class msdyn_GetRelatedIoTDevicesByEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedIoTDevicesByEntityResponse) {
    super("msdyn_GetRelatedIoTDevicesByEntity");
  }

  static fromResponse(data: unknown): msdyn_GetRelatedIoTDevicesByEntityResponse {
    return new msdyn_GetRelatedIoTDevicesByEntityResponse((data as any).value);
  }
}
