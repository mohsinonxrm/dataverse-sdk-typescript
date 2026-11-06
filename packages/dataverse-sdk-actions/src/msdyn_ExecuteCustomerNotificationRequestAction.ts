import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteCustomerNotificationRequest action
 */
export interface msdyn_ExecuteCustomerNotificationRequestResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExecuteCustomerNotificationRequestResponse;
  }
}
