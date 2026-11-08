import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { InitializeUploadUsingSasResponse } from "./types/index.js";

/**
 * Parameters of the GetFileSasUrlForUpload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFileSasUrlForUploadRequestParameters {
  Target: EntityReference;
  FileAttributeName: string;
  FileName: string;
}

/**
 * GetFileSasUrlForUpload request message
 *
 * Web API Function: GetFileSasUrlForUpload
 */
export class GetFileSasUrlForUploadRequest
  extends OrganizationRequest
  implements Executable<GetFileSasUrlForUploadResponse>
{
  declare readonly Parameters: Readonly<GetFileSasUrlForUploadRequestParameters>;

  constructor(parameters: GetFileSasUrlForUploadRequestParameters) {
    super("GetFileSasUrlForUpload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetFileSasUrlForUpload`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.FileAttributeName !== undefined) {
      aliases.push(`FileAttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.FileAttributeName, "Edm.String"));
    }
    if (this.Parameters.FileName !== undefined) {
      aliases.push(`FileName=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.FileName, "Edm.String"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetFileSasUrlForUploadResponse> {
    // The body is the complex value, with its @odata.context
    return GetFileSasUrlForUploadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetFileSasUrlForUpload function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetFileSasUrlForUploadResult {
  "@odata.context"?: string;
  Result: InitializeUploadUsingSasResponse;
}

/**
 * GetFileSasUrlForUpload response message
 *
 * `result` is the value the GetFileSasUrlForUpload function returns (see {@link GetFileSasUrlForUploadResult}).
 */
export class GetFileSasUrlForUploadResponse extends OrganizationResponse {
  constructor(public result: GetFileSasUrlForUploadResult) {
    super("GetFileSasUrlForUpload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetFileSasUrlForUploadResponse {
    return new GetFileSasUrlForUploadResponse(data as GetFileSasUrlForUploadResult);
  }
}
