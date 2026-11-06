import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_transformentity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_transformentityRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  Params: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_transformentity request message
 *
 * Web API Action: msdyn_transformentity
 */
export class msdyn_transformentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_transformentityResponse>
{
  declare readonly Parameters: Readonly<msdyn_transformentityRequestParameters>;

  constructor(parameters: msdyn_transformentityRequestParameters) {
    super("msdyn_transformentity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_transformentity`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      Params: this.Parameters.Params,
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

  async parseResponse(response: Response): Promise<msdyn_transformentityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return msdyn_transformentityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_transformentityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_transformentity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_transformentityResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_transformentity response message
 *
 * `result` is the value the msdyn_transformentity action returns (see {@link msdyn_transformentityResult}).
 */
export class msdyn_transformentityResponse extends OrganizationResponse {
  constructor(public result: msdyn_transformentityResult) {
    super("msdyn_transformentity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_transformentityResponse {
    return new msdyn_transformentityResponse((data ?? null) as msdyn_transformentityResult);
  }
}
