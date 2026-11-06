import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RegisterCustomEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterCustomEntityRequestParameters {
  EntityIds: string;
  EntityLogicalName: string;
  DeviceIds?: string;
  Names?: string;
  AccountIds?: string;
}

/**
 * msdyn_RegisterCustomEntity request message
 *
 * Web API Action: msdyn_RegisterCustomEntity
 */
export class msdyn_RegisterCustomEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterCustomEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_RegisterCustomEntityRequestParameters>;

  constructor(parameters: msdyn_RegisterCustomEntityRequestParameters) {
    super("msdyn_RegisterCustomEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterCustomEntity`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      DeviceIds: this.Parameters.DeviceIds,
      Names: this.Parameters.Names,
      AccountIds: this.Parameters.AccountIds,
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

  parseResponse(_response: Response): Promise<msdyn_RegisterCustomEntityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_RegisterCustomEntityResponse());
  }
}

/**
 * msdyn_RegisterCustomEntity response message
 */
export class msdyn_RegisterCustomEntityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RegisterCustomEntity");
  }

  static fromResponse(_data?: unknown): msdyn_RegisterCustomEntityResponse {
    return new msdyn_RegisterCustomEntityResponse();
  }
}
