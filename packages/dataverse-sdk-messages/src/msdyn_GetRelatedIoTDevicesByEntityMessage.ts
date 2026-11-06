import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRelatedIoTDevicesByEntityResponse as msdyn_GetRelatedIoTDevicesByEntityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRelatedIoTDevicesByEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRelatedIoTDevicesByEntityRequestParameters {
  EntityLogicalName: string;
  EntityId: string;
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity request message
 *
 * Web API Action: msdyn_GetRelatedIoTDevicesByEntity
 */
export class msdyn_GetRelatedIoTDevicesByEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRelatedIoTDevicesByEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRelatedIoTDevicesByEntityRequestParameters>;

  constructor(parameters: msdyn_GetRelatedIoTDevicesByEntityRequestParameters) {
    super("msdyn_GetRelatedIoTDevicesByEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRelatedIoTDevicesByEntity`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      EntityId: this.Parameters.EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetRelatedIoTDevicesByEntityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetRelatedIoTDevicesByEntityResponse.fromResponse({});
    return msdyn_GetRelatedIoTDevicesByEntityResponse.fromResponse(await response.json());
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
