import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRelatedIoTDevicesByEntity action
 */
export interface msdyn_GetRelatedIoTDevicesByEntityResponse {
  RelatedIoTDevicesByEntityOutput: string;
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity action
 *
 * Unbound action
 */
export class msdyn_GetRelatedIoTDevicesByEntityAction implements Executable<msdyn_GetRelatedIoTDevicesByEntityResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly entityId: string
  ) {}

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
    return data as msdyn_GetRelatedIoTDevicesByEntityResponse;
  }
}
