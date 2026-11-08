import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveCascadeAssignAsyncJobId message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCascadeAssignAsyncJobIdRequestParameters {
  ParentEntityId: string;
}

/**
 * RetrieveCascadeAssignAsyncJobId request message
 *
 * Web API Function: RetrieveCascadeAssignAsyncJobId
 */
export class RetrieveCascadeAssignAsyncJobIdRequest
  extends OrganizationRequest
  implements Executable<RetrieveCascadeAssignAsyncJobIdResponse>
{
  declare readonly Parameters: Readonly<RetrieveCascadeAssignAsyncJobIdRequestParameters>;

  constructor(parameters: RetrieveCascadeAssignAsyncJobIdRequestParameters) {
    super("RetrieveCascadeAssignAsyncJobId", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeAssignAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ParentEntityId !== undefined) {
      aliases.push(`ParentEntityId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ParentEntityId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveCascadeAssignAsyncJobIdResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveCascadeAssignAsyncJobIdResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveCascadeAssignAsyncJobId function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveCascadeAssignAsyncJobIdResult {
  "@odata.context"?: string;
  AsyncJobId: string;
  AsyncJobName: string;
}

/**
 * RetrieveCascadeAssignAsyncJobId response message
 *
 * `result` is the value the RetrieveCascadeAssignAsyncJobId function returns (see {@link RetrieveCascadeAssignAsyncJobIdResult}).
 */
export class RetrieveCascadeAssignAsyncJobIdResponse extends OrganizationResponse {
  constructor(public result: RetrieveCascadeAssignAsyncJobIdResult) {
    super("RetrieveCascadeAssignAsyncJobId");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveCascadeAssignAsyncJobIdResponse {
    return new RetrieveCascadeAssignAsyncJobIdResponse(
      data as RetrieveCascadeAssignAsyncJobIdResult
    );
  }
}
