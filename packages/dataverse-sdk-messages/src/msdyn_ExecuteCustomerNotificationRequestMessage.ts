import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExecuteCustomerNotificationRequest request message
 *
 * Web API Action: msdyn_ExecuteCustomerNotificationRequest
 */
export class msdyn_ExecuteCustomerNotificationRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteCustomerNotificationRequestResponse>
{
  constructor() {
    super("msdyn_ExecuteCustomerNotificationRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCustomerNotificationRequest`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExecuteCustomerNotificationRequestResponse> {
    const data = await response.json();
    return msdyn_ExecuteCustomerNotificationRequestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_ExecuteCustomerNotificationRequest response message
 */
export class msdyn_ExecuteCustomerNotificationRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteCustomerNotificationRequestResponse) {
    super("msdyn_ExecuteCustomerNotificationRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteCustomerNotificationRequestResponse {
    return new msdyn_ExecuteCustomerNotificationRequestResponse((data as any).value);
  }
}
