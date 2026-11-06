import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetAdditionalPropertiesMetadataResponse as msdyn_GetAdditionalPropertiesMetadataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetAdditionalPropertiesMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAdditionalPropertiesMetadataRequestParameters {
  Type: number;
}

/**
 * msdyn_GetAdditionalPropertiesMetadata request message
 *
 * Web API Action: msdyn_GetAdditionalPropertiesMetadata
 */
export class msdyn_GetAdditionalPropertiesMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAdditionalPropertiesMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAdditionalPropertiesMetadataRequestParameters>;

  constructor(parameters: msdyn_GetAdditionalPropertiesMetadataRequestParameters) {
    super("msdyn_GetAdditionalPropertiesMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAdditionalPropertiesMetadata`;

    const body = requestBody({
      Type: this.Parameters.Type,
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

  async parseResponse(response: Response): Promise<msdyn_GetAdditionalPropertiesMetadataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetAdditionalPropertiesMetadataResponse.fromResponse({});
    return msdyn_GetAdditionalPropertiesMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetAdditionalPropertiesMetadata response message
 */
export class msdyn_GetAdditionalPropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAdditionalPropertiesMetadataResponseData) {
    super("msdyn_GetAdditionalPropertiesMetadata");
  }

  static fromResponse(data: unknown): msdyn_GetAdditionalPropertiesMetadataResponse {
    return new msdyn_GetAdditionalPropertiesMetadataResponse(
      responseObject<msdyn_GetAdditionalPropertiesMetadataResponseData>(data)
    );
  }
}
