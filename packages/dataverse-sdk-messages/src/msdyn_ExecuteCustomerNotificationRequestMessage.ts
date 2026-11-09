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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteCustomerNotificationRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteCustomerNotificationRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteCustomerNotificationRequestResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_ExecuteCustomerNotificationRequest response message
 *
 * `result` is the value the msdyn_ExecuteCustomerNotificationRequest action returns (see {@link msdyn_ExecuteCustomerNotificationRequestResult}).
 */
export class msdyn_ExecuteCustomerNotificationRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteCustomerNotificationRequestResult) {
    super("msdyn_ExecuteCustomerNotificationRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteCustomerNotificationRequestResponse {
    return new msdyn_ExecuteCustomerNotificationRequestResponse(
      data as msdyn_ExecuteCustomerNotificationRequestResult
    );
  }
}
