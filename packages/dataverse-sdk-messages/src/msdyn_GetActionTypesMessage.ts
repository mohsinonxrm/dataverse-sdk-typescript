import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetActionTypes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetActionTypesRequestParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetActionTypes request message
 *
 * Web API Action: msdyn_GetActionTypes
 */
export class msdyn_GetActionTypesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetActionTypesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetActionTypesRequestParameters>;

  constructor(parameters: msdyn_GetActionTypesRequestParameters) {
    super("msdyn_GetActionTypes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetActionTypes`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return msdyn_GetActionTypesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return msdyn_GetActionTypesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetActionTypes action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type msdyn_GetActionTypesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * msdyn_GetActionTypes response message
 *
 * `result` is the value the msdyn_GetActionTypes action returns (see {@link msdyn_GetActionTypesResult}).
 */
export class msdyn_GetActionTypesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetActionTypesResult) {
    super("msdyn_GetActionTypes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetActionTypesResponse {
    return new msdyn_GetActionTypesResponse(
      data === undefined ? [] : (data as { value: msdyn_GetActionTypesResult }).value
    );
  }
}
