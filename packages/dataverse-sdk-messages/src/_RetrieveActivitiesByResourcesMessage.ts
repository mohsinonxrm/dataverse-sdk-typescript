import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _RetrieveActivitiesByResourcesResponse as _RetrieveActivitiesByResourcesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return _RetrieveActivitiesByResourcesResponse.fromResponse({});
    return _RetrieveActivitiesByResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * _RetrieveActivitiesByResources response message
 */
export class _RetrieveActivitiesByResourcesResponse extends OrganizationResponse {
  constructor(public result: _RetrieveActivitiesByResourcesResponseData) {
    super("_RetrieveActivitiesByResources");
  }

  static fromResponse(data: unknown): _RetrieveActivitiesByResourcesResponse {
    return new _RetrieveActivitiesByResourcesResponse(
      responseObject<_RetrieveActivitiesByResourcesResponseData>(data)
    );
  }
}
