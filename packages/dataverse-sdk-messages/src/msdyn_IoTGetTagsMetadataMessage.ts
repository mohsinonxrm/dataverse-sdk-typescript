import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotdevicecategory } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IoTGetTagsMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTGetTagsMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetTagsMetadataResult {
  "@odata.context"?: string;
  Metadata: string;
}

/**
 * msdyn_IoTGetTagsMetadata response message
 *
 * `result` is the value the msdyn_IoTGetTagsMetadata action returns (see {@link msdyn_IoTGetTagsMetadataResult}).
 */
export class msdyn_IoTGetTagsMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetTagsMetadataResult) {
    super("msdyn_IoTGetTagsMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTGetTagsMetadataResponse {
    return new msdyn_IoTGetTagsMetadataResponse(data as msdyn_IoTGetTagsMetadataResult);
  }
}
