import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_fetchEntityMetadata message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchEntityMetadataRequestParameters {
  fetchEntityMetadataRequest: string;
}

/**
 * msdyn_fetchEntityMetadata request message
 *
 * Web API Action: msdyn_fetchEntityMetadata
 */
export class msdyn_fetchEntityMetadataRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchEntityMetadataResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchEntityMetadataRequestParameters>;

  constructor(parameters: msdyn_fetchEntityMetadataRequestParameters) {
    super("msdyn_fetchEntityMetadata", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchEntityMetadata`;

    const body = requestBody({
      fetchEntityMetadataRequest: this.Parameters.fetchEntityMetadataRequest,
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

  async parseResponse(response: Response): Promise<msdyn_fetchEntityMetadataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_fetchEntityMetadataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_fetchEntityMetadata action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchEntityMetadataResult {
  "@odata.context"?: string;
  fetchEntityMetadataResponse: string;
}

/**
 * msdyn_fetchEntityMetadata response message
 *
 * `result` is the value the msdyn_fetchEntityMetadata action returns (see {@link msdyn_fetchEntityMetadataResult}).
 */
export class msdyn_fetchEntityMetadataResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchEntityMetadataResult) {
    super("msdyn_fetchEntityMetadata");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_fetchEntityMetadataResponse {
    return new msdyn_fetchEntityMetadataResponse(data as msdyn_fetchEntityMetadataResult);
  }
}
