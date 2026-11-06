import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAcceleratorMailNotificationToAdmin action
 */
export interface msdyn_SalesAcceleratorMailNotificationToAdminResponse {
  // No content returned
}

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin action
 *
 * Unbound action
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminAction implements Executable<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
  constructor(public readonly inputData?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAcceleratorMailNotificationToAdmin`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
    // No return value (204 No Content)
    return {};
  }
}
