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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IoTGetIoTAlertCustomAttributesResponse> {
    const data = await response.json();
    return data as msdyn_IoTGetIoTAlertCustomAttributesResponse;
  }
}
