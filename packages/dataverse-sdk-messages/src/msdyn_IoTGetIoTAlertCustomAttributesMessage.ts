import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTGetIoTAlertCustomAttributes request message
 *
 * Web API Action: msdyn_IoTGetIoTAlertCustomAttributes
 */
export class msdyn_IoTGetIoTAlertCustomAttributesRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetIoTAlertCustomAttributesResponse>
{
  constructor() {
    super("msdyn_IoTGetIoTAlertCustomAttributes");
  }

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
    return msdyn_IoTGetIoTAlertCustomAttributesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_IoTGetIoTAlertCustomAttributes response message
 */
export class msdyn_IoTGetIoTAlertCustomAttributesResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetIoTAlertCustomAttributesResponse) {
    super("msdyn_IoTGetIoTAlertCustomAttributes");
  }

  static fromResponse(data: unknown): msdyn_IoTGetIoTAlertCustomAttributesResponse {
    return new msdyn_IoTGetIoTAlertCustomAttributesResponse((data as any).value);
  }
}
