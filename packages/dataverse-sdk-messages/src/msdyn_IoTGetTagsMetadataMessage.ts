import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_IoTGetTagsMetadataResponse as msdyn_IoTGetTagsMetadataResponseData,
  msdyn_iotdevicecategory,
} from "./types/index.js";

/**
 * Parameters of the msdyn_IoTGetTagsMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTGetTagsMetadataRequestParameters {
  DeviceCategory: EntityReference | EntityPayload<msdyn_iotdevicecategory>;
}

/**
 * msdyn_IoTGetTagsMetadata request message
 *
 * Web API Action: msdyn_IoTGetTagsMetadata
 */
export class msdyn_IoTGetTagsMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetTagsMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTGetTagsMetadataRequestParameters>;

  constructor(parameters: msdyn_IoTGetTagsMetadataRequestParameters) {
    super("msdyn_IoTGetTagsMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetTagsMetadata`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTGetTagsMetadataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_IoTGetTagsMetadataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_IoTGetTagsMetadata response message
 */
export class msdyn_IoTGetTagsMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetTagsMetadataResponseData) {
    super("msdyn_IoTGetTagsMetadata");
  }

  static fromResponse(data: unknown): msdyn_IoTGetTagsMetadataResponse {
    return new msdyn_IoTGetTagsMetadataResponse(
      responseObject<msdyn_IoTGetTagsMetadataResponseData>(data)
    );
  }
}
