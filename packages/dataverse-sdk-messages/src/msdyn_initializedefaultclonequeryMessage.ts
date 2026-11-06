import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_bookingsetupmetadata, msdyn_configuration } from "./types/index.js";

/**
 * Parameters of the msdyn_initializedefaultclonequery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_initializedefaultclonequeryRequestParameters {
  WorkType: EntityReference | EntityPayload<msdyn_bookingsetupmetadata>;
  Configuration?: EntityReference | EntityPayload<msdyn_configuration>;
}

/**
 * msdyn_initializedefaultclonequery request message
 *
 * Web API Action: msdyn_initializedefaultclonequery
 */
export class msdyn_initializedefaultclonequeryRequest
  extends OrganizationRequest
  implements Executable<msdyn_initializedefaultclonequeryResponse>
{
  declare readonly Parameters: Readonly<msdyn_initializedefaultclonequeryRequestParameters>;

  constructor(parameters: msdyn_initializedefaultclonequeryRequestParameters) {
    super("msdyn_initializedefaultclonequery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_initializedefaultclonequery`;

    const body = requestBody({
      WorkType: this.Parameters.WorkType,
      Configuration: this.Parameters.Configuration,
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

  async parseResponse(response: Response): Promise<msdyn_initializedefaultclonequeryResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_initializedefaultclonequeryResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_initializedefaultclonequeryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_initializedefaultclonequery action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_initializedefaultclonequeryResult =
  | (msdyn_configuration & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_initializedefaultclonequery response message
 *
 * `result` is the value the msdyn_initializedefaultclonequery action returns (see {@link msdyn_initializedefaultclonequeryResult}).
 */
export class msdyn_initializedefaultclonequeryResponse extends OrganizationResponse {
  constructor(public result: msdyn_initializedefaultclonequeryResult) {
    super("msdyn_initializedefaultclonequery");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_initializedefaultclonequeryResponse {
    return new msdyn_initializedefaultclonequeryResponse(
      (data ?? null) as msdyn_initializedefaultclonequeryResult
    );
  }
}
