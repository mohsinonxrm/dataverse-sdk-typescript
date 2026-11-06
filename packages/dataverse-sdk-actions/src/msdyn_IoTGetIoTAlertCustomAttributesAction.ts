import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTGetIoTAlertCustomAttributes action
 */
export interface msdyn_IoTGetIoTAlertCustomAttributesResponse {
  Metadata: string;
}

/**
 * msdyn_IoTGetIoTAlertCustomAttributes action
 *
 * Unbound action
 */
export class msdyn_IoTGetIoTAlertCustomAttributesAction implements Executable<msdyn_IoTGetIoTAlertCustomAttributesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetIoTAlertCustomAttributes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IoTGetIoTAlertCustomAttributesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTGetIoTAlertCustomAttributesResponse;
    return (await response.json()) as msdyn_IoTGetIoTAlertCustomAttributesResponse;
  }
}
