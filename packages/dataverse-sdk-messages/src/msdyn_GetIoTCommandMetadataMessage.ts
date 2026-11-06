import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetIoTCommandMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetIoTCommandMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIoTCommandMetadataResult {
  "@odata.context"?: string;
  CommandMetadata: string;
}

/**
 * msdyn_GetIoTCommandMetadata response message
 *
 * `result` is the value the msdyn_GetIoTCommandMetadata action returns (see {@link msdyn_GetIoTCommandMetadataResult}).
 */
export class msdyn_GetIoTCommandMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTCommandMetadataResult) {
    super("msdyn_GetIoTCommandMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetIoTCommandMetadataResponse {
    return new msdyn_GetIoTCommandMetadataResponse(data as msdyn_GetIoTCommandMetadataResult);
  }
}
