import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveCascadeDeleteAsyncJobId message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCascadeDeleteAsyncJobIdRequestParameters {
  ParentEntityIds: string[];
}

/**
 * RetrieveCascadeDeleteAsyncJobId request message
 *
 * Web API Function: RetrieveCascadeDeleteAsyncJobId
 */
export class RetrieveCascadeDeleteAsyncJobIdRequest
  extends OrganizationRequest
  implements Executable<RetrieveCascadeDeleteAsyncJobIdResponse>
{
  declare readonly Parameters: Readonly<RetrieveCascadeDeleteAsyncJobIdRequestParameters>;

  constructor(parameters: RetrieveCascadeDeleteAsyncJobIdRequestParameters) {
    super("RetrieveCascadeDeleteAsyncJobId", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeDeleteAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ParentEntityIds !== undefined) {
      aliases.push(`ParentEntityIds=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.ParentEntityIds, "Collection(Edm.Guid)", "Collection")
      );
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

  async parseResponse(response: Response): Promise<RetrieveCascadeDeleteAsyncJobIdResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveCascadeDeleteAsyncJobIdResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveCascadeDeleteAsyncJobId function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveCascadeDeleteAsyncJobIdResult {
  "@odata.context"?: string;
  AsyncJobId: string;
  AsyncJobName: string;
}

/**
 * RetrieveCascadeDeleteAsyncJobId response message
 *
 * `result` is the value the RetrieveCascadeDeleteAsyncJobId function returns (see {@link RetrieveCascadeDeleteAsyncJobIdResult}).
 */
export class RetrieveCascadeDeleteAsyncJobIdResponse extends OrganizationResponse {
  constructor(public result: RetrieveCascadeDeleteAsyncJobIdResult) {
    super("RetrieveCascadeDeleteAsyncJobId");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveCascadeDeleteAsyncJobIdResponse {
    return new RetrieveCascadeDeleteAsyncJobIdResponse(
      data as RetrieveCascadeDeleteAsyncJobIdResult
    );
  }
}
