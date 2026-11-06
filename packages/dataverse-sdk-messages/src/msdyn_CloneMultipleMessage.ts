import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_configuration } from "./types/index.js";

/**
 * Parameters of the msdyn_CloneMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CloneMultipleRequestParameters {
  EntityIds: string;
  QueryReference?: EntityReference | EntityPayload<msdyn_configuration>;
  UfxQuery?: string;
  TransformAction?: string;
  TransformParams?: string;
}

/**
 * msdyn_CloneMultiple request message
 *
 * Web API Action: msdyn_CloneMultiple
 */
export class msdyn_CloneMultipleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CloneMultipleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CloneMultipleRequestParameters>;

  constructor(parameters: msdyn_CloneMultipleRequestParameters) {
    super("msdyn_CloneMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneMultiple`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      QueryReference: this.Parameters.QueryReference,
      UfxQuery: this.Parameters.UfxQuery,
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

  async parseResponse(response: Response): Promise<msdyn_CloneMultipleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CloneMultipleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CloneMultiple action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CloneMultipleResult {
  "@odata.context"?: string;
  CopiedEntities: string;
}

/**
 * msdyn_CloneMultiple response message
 *
 * `result` is the value the msdyn_CloneMultiple action returns (see {@link msdyn_CloneMultipleResult}).
 */
export class msdyn_CloneMultipleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CloneMultipleResult) {
    super("msdyn_CloneMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CloneMultipleResponse {
    return new msdyn_CloneMultipleResponse(data as msdyn_CloneMultipleResult);
  }
}
