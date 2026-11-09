import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _RetrieveActivitiesByResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RetrieveActivitiesByResourcesRequestParameters {
  StartDate: string;
  EndDate: string;
  ResourceIds: string;
  ActivityType: number;
}

/**
 * _RetrieveActivitiesByResources request message
 *
 * Web API Action: _RetrieveActivitiesByResources
 */
export class _RetrieveActivitiesByResourcesRequest
  extends OrganizationRequest
  implements Executable<_RetrieveActivitiesByResourcesResponse>
{
  declare readonly Parameters: Readonly<_RetrieveActivitiesByResourcesRequestParameters>;

  constructor(parameters: _RetrieveActivitiesByResourcesRequestParameters) {
    super("_RetrieveActivitiesByResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RetrieveActivitiesByResources`;

    const body = requestBody({
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      ResourceIds: this.Parameters.ResourceIds,
      ActivityType: this.Parameters.ActivityType,
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

  async parseResponse(response: Response): Promise<_RetrieveActivitiesByResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return _RetrieveActivitiesByResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _RetrieveActivitiesByResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _RetrieveActivitiesByResourcesResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
  Result: string;
}

/**
 * _RetrieveActivitiesByResources response message
 *
 * `result` is the value the _RetrieveActivitiesByResources action returns (see {@link _RetrieveActivitiesByResourcesResult}).
 */
export class _RetrieveActivitiesByResourcesResponse extends OrganizationResponse {
  constructor(public result: _RetrieveActivitiesByResourcesResult) {
    super("_RetrieveActivitiesByResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _RetrieveActivitiesByResourcesResponse {
    return new _RetrieveActivitiesByResourcesResponse(data as _RetrieveActivitiesByResourcesResult);
  }
}
