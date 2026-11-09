import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAcceleratorMailNotificationToAdmin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAcceleratorMailNotificationToAdminRequestParameters {
  InputData?: string;
}

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin request message
 *
 * Web API Action: msdyn_SalesAcceleratorMailNotificationToAdmin
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAcceleratorMailNotificationToAdminResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAcceleratorMailNotificationToAdminRequestParameters>;

  constructor(parameters: msdyn_SalesAcceleratorMailNotificationToAdminRequestParameters = {}) {
    super("msdyn_SalesAcceleratorMailNotificationToAdmin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAcceleratorMailNotificationToAdmin`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SalesAcceleratorMailNotificationToAdminResponse());
  }
}

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin response message
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAcceleratorMailNotificationToAdmin");
  }

  static fromResponse(_data?: unknown): msdyn_SalesAcceleratorMailNotificationToAdminResponse {
    return new msdyn_SalesAcceleratorMailNotificationToAdminResponse();
  }
}
