import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_cloneentity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_cloneentityRequestParameters {
  SourceEntity: EntityReference | AnyEntityPayload;
  QueryReference?: EntityReference | AnyEntityPayload;
  TransformAction?: string;
  TransformParams?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_cloneentity request message
 *
 * Web API Action: msdyn_cloneentity
 */
export class msdyn_cloneentityRequest
  extends OrganizationRequest
  implements Executable<msdyn_cloneentityResponse>
{
  declare readonly Parameters: Readonly<msdyn_cloneentityRequestParameters>;

  constructor(parameters: msdyn_cloneentityRequestParameters) {
    super("msdyn_cloneentity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_cloneentity`;

    const body = requestBody({
      SourceEntity: this.Parameters.SourceEntity,
      QueryReference: this.Parameters.QueryReference,
      TransformAction: this.Parameters.TransformAction,
      TransformParams: this.Parameters.TransformParams,
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

  async parseResponse(response: Response): Promise<msdyn_cloneentityResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return msdyn_cloneentityResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_cloneentityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_cloneentity action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_cloneentityResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_cloneentity response message
 *
 * `result` is the value the msdyn_cloneentity action returns (see {@link msdyn_cloneentityResult}).
 */
export class msdyn_cloneentityResponse extends OrganizationResponse {
  constructor(public result: msdyn_cloneentityResult) {
    super("msdyn_cloneentity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_cloneentityResponse {
    return new msdyn_cloneentityResponse((data ?? null) as msdyn_cloneentityResult);
  }
}
