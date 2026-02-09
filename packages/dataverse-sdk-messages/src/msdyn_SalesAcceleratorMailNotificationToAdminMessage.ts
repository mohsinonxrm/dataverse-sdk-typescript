import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin request message
 *
 * Web API Action: msdyn_SalesAcceleratorMailNotificationToAdmin
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAcceleratorMailNotificationToAdminResponse>
{
  constructor(public inputData: string) {
    super("msdyn_SalesAcceleratorMailNotificationToAdmin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAcceleratorMailNotificationToAdmin`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAcceleratorMailNotificationToAdminResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin response message
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAcceleratorMailNotificationToAdmin");
  }

  static fromResponse(_data: unknown): msdyn_SalesAcceleratorMailNotificationToAdminResponse {
    return new msdyn_SalesAcceleratorMailNotificationToAdminResponse();
  }
}
