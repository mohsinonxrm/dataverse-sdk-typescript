import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * Parameters of the msdyn_BusinessClosureRetrieve message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureRetrieveRequestParameters {
  Id: string;
}

/**
 * msdyn_BusinessClosureRetrieve request message
 *
 * Web API Action: msdyn_BusinessClosureRetrieve
 */
export class msdyn_BusinessClosureRetrieveRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureRetrieveResponse>
{
  declare readonly Parameters: Readonly<msdyn_BusinessClosureRetrieveRequestParameters>;

  constructor(parameters: msdyn_BusinessClosureRetrieveRequestParameters) {
    super("msdyn_BusinessClosureRetrieve", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body = requestBody({
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_BusinessClosureRetrieveResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_BusinessClosureRetrieveResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_BusinessClosureRetrieve action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_BusinessClosureRetrieveResult =
  | (msdyn_businessclosure & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_BusinessClosureRetrieve response message
 *
 * `result` is the value the msdyn_BusinessClosureRetrieve action returns (see {@link msdyn_BusinessClosureRetrieveResult}).
 */
export class msdyn_BusinessClosureRetrieveResponse extends OrganizationResponse {
  constructor(public result: msdyn_BusinessClosureRetrieveResult) {
    super("msdyn_BusinessClosureRetrieve");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_BusinessClosureRetrieveResponse {
    return new msdyn_BusinessClosureRetrieveResponse(
      (data ?? null) as msdyn_BusinessClosureRetrieveResult
    );
  }
}
