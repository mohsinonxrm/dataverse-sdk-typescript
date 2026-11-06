import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetIoTCommandMetadataResponse as msdyn_GetIoTCommandMetadataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetIoTCommandMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTCommandMetadataRequestParameters {
  IoTCommandDefinition: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetIoTCommandMetadata request message
 *
 * Web API Action: msdyn_GetIoTCommandMetadata
 */
export class msdyn_GetIoTCommandMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTCommandMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIoTCommandMetadataRequestParameters>;

  constructor(parameters: msdyn_GetIoTCommandMetadataRequestParameters) {
    super("msdyn_GetIoTCommandMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTCommandMetadata`;

    const body = requestBody({
      IoTCommandDefinition: this.Parameters.IoTCommandDefinition,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTCommandMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetIoTCommandMetadataResponse.fromResponse({});
    return msdyn_GetIoTCommandMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetIoTCommandMetadata response message
 */
export class msdyn_GetIoTCommandMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTCommandMetadataResponseData) {
    super("msdyn_GetIoTCommandMetadata");
  }

  static fromResponse(data: unknown): msdyn_GetIoTCommandMetadataResponse {
    return new msdyn_GetIoTCommandMetadataResponse(
      responseObject<msdyn_GetIoTCommandMetadataResponseData>(data)
    );
  }
}
