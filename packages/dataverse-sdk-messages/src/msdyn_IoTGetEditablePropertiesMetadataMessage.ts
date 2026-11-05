import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_iotdevicecategory } from "./types/index.js";

/**
 * msdyn_IoTGetEditablePropertiesMetadata request message
 *
 * Web API Action: msdyn_IoTGetEditablePropertiesMetadata
 */
export class msdyn_IoTGetEditablePropertiesMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetEditablePropertiesMetadataResponse>
{
  constructor(public deviceCategory: msdyn_iotdevicecategory) {
    super("msdyn_IoTGetEditablePropertiesMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetEditablePropertiesMetadata`;

    const body: Record<string, unknown> = {
      DeviceCategory: this.deviceCategory,
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

  async parseResponse(response: Response): Promise<msdyn_IoTGetEditablePropertiesMetadataResponse> {
    const data = await response.json();
    return msdyn_IoTGetEditablePropertiesMetadataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      DeviceCategory: this.deviceCategory,
    };
  }
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata response message
 */
export class msdyn_IoTGetEditablePropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetEditablePropertiesMetadataResponse) {
    super("msdyn_IoTGetEditablePropertiesMetadata");
  }

  static fromResponse(data: unknown): msdyn_IoTGetEditablePropertiesMetadataResponse {
    return new msdyn_IoTGetEditablePropertiesMetadataResponse((data as any).value);
  }
}
