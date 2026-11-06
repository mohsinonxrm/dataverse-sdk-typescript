import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IoTGetIoTAlertCustomAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetIoTAlertCustomAttributesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTGetIoTAlertCustomAttributesResponse;
  }
}
