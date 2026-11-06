import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotdevicecategory } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_IoTGetEditablePropertiesMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTGetEditablePropertiesMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTGetEditablePropertiesMetadataResult {
  "@odata.context"?: string;
  Metadata: string;
}

/**
 * msdyn_IoTGetEditablePropertiesMetadata response message
 *
 * `result` is the value the msdyn_IoTGetEditablePropertiesMetadata action returns (see {@link msdyn_IoTGetEditablePropertiesMetadataResult}).
 */
export class msdyn_IoTGetEditablePropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTGetEditablePropertiesMetadataResult) {
    super("msdyn_IoTGetEditablePropertiesMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTGetEditablePropertiesMetadataResponse {
    return new msdyn_IoTGetEditablePropertiesMetadataResponse(
      data as msdyn_IoTGetEditablePropertiesMetadataResult
    );
  }
}
