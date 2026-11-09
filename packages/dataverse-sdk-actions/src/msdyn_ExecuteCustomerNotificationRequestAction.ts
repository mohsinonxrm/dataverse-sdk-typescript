import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_ExecuteCustomerNotificationRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteCustomerNotificationRequestResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_ExecuteCustomerNotificationRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteCustomerNotificationRequestAction implements Executable<msdyn_ExecuteCustomerNotificationRequestResponse> {
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
    return (await response.json()) as msdyn_ExecuteCustomerNotificationRequestResponse;
  }
}
