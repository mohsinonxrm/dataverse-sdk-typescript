import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_IoTGetEditablePropertiesMetadataResponse as msdyn_IoTGetEditablePropertiesMetadataResponseData,
  msdyn_iotdevicecategory,
} from "./types/index.js";

/**
 * Parameters of the msdyn_IoTGetEditablePropertiesMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetEditablePropertiesMetadataRequestParameters {
  DeviceCategory: EntityReference | EntityPayload<msdyn_iotdevicecategory>;
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata request message
 *
 * Web API Action: msdyn_IoTGetEditablePropertiesMetadata
 */
export class msdyn_IoTGetEditablePropertiesMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetEditablePropertiesMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTGetEditablePropertiesMetadataRequestParameters>;

  constructor(parameters: msdyn_IoTGetEditablePropertiesMetadataRequestParameters) {
    super("msdyn_IoTGetEditablePropertiesMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetEditablePropertiesMetadata`;

    const body = requestBody({
      DeviceCategory: this.Parameters.DeviceCategory,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_IoTGetEditablePropertiesMetadataResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata response message
 */
export class msdyn_IoTGetEditablePropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetEditablePropertiesMetadataResponseData) {
    super("msdyn_IoTGetEditablePropertiesMetadata");
  }

  static fromResponse(data: unknown): msdyn_IoTGetEditablePropertiesMetadataResponse {
    return new msdyn_IoTGetEditablePropertiesMetadataResponse(
      responseObject<msdyn_IoTGetEditablePropertiesMetadataResponseData>(data)
    );
  }
}
