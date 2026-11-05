import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  msdyn_IoTGetTagsMetadataResponse as msdyn_IoTGetTagsMetadataResponseData,
  msdyn_iotdevicecategory,
} from "./types/index.js";

/**
 * msdyn_IoTGetTagsMetadata request message
 *
 * Web API Action: msdyn_IoTGetTagsMetadata
 */
export class msdyn_IoTGetTagsMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTGetTagsMetadataResponse>
{
  constructor(public deviceCategory: msdyn_iotdevicecategory) {
    super("msdyn_IoTGetTagsMetadata");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTGetTagsMetadata`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTGetTagsMetadataResponse> {
    const data = await response.json();
    return msdyn_IoTGetTagsMetadataResponse.fromResponse(data);
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
