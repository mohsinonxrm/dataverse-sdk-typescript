import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetRelatedIoTDevicesByEntityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRelatedIoTDevicesByEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRelatedIoTDevicesByEntityResult {
  "@odata.context"?: string;
  RelatedIoTDevicesByEntityOutput: string;
}

/**
 * msdyn_GetRelatedIoTDevicesByEntity response message
 *
 * `result` is the value the msdyn_GetRelatedIoTDevicesByEntity action returns (see {@link msdyn_GetRelatedIoTDevicesByEntityResult}).
 */
export class msdyn_GetRelatedIoTDevicesByEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRelatedIoTDevicesByEntityResult) {
    super("msdyn_GetRelatedIoTDevicesByEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRelatedIoTDevicesByEntityResponse {
    return new msdyn_GetRelatedIoTDevicesByEntityResponse(
      data as msdyn_GetRelatedIoTDevicesByEntityResult
    );
  }
}
