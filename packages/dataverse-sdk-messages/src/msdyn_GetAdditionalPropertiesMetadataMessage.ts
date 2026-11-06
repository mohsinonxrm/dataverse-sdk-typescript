import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetAdditionalPropertiesMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAdditionalPropertiesMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAdditionalPropertiesMetadataResult {
  "@odata.context"?: string;
  Metadata: string;
}

/**
 * msdyn_GetAdditionalPropertiesMetadata response message
 *
 * `result` is the value the msdyn_GetAdditionalPropertiesMetadata action returns (see {@link msdyn_GetAdditionalPropertiesMetadataResult}).
 */
export class msdyn_GetAdditionalPropertiesMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAdditionalPropertiesMetadataResult) {
    super("msdyn_GetAdditionalPropertiesMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAdditionalPropertiesMetadataResponse {
    return new msdyn_GetAdditionalPropertiesMetadataResponse(
      data as msdyn_GetAdditionalPropertiesMetadataResult
    );
  }
}
