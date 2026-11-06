import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExecuteCustomerNotificationRequestResponse as msdyn_ExecuteCustomerNotificationRequestResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ExecuteCustomerNotificationRequestResponse.fromResponse({});
    return msdyn_ExecuteCustomerNotificationRequestResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ExecuteCustomerNotificationRequest response message
 */
export class msdyn_ExecuteCustomerNotificationRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteCustomerNotificationRequestResponseData) {
    super("msdyn_ExecuteCustomerNotificationRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteCustomerNotificationRequestResponse {
    return new msdyn_ExecuteCustomerNotificationRequestResponse(
      responseObject<msdyn_ExecuteCustomerNotificationRequestResponseData>(data)
    );
  }
}
