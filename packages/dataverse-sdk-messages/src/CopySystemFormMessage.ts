import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemform } from "./types/index.js";

/**
 * Parameters of the CopySystemForm message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CopySystemFormRequestParameters {
  Target?: EntityReference | EntityPayload<systemform>;
}

/**
 * CopySystemForm request message
 *
 * Web API Action: CopySystemForm
 *
 * The first argument is the id of the systemform record to call it on.
 */
export class CopySystemFormRequest
  extends OrganizationRequest
  implements Executable<CopySystemFormResponse>
{
  declare readonly Parameters: Readonly<CopySystemFormRequestParameters>;

  constructor(
    public systemformId: string,
    parameters: CopySystemFormRequestParameters = {}
  ) {
    super("CopySystemForm", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemforms(${odataLiteral.guid(this.systemformId)})/Microsoft.Dynamics.CRM.CopySystemForm`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<CopySystemFormResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return CopySystemFormResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CopySystemFormResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CopySystemForm action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CopySystemFormResult =
  | (systemform & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * CopySystemForm response message
 *
 * `result` is the value the CopySystemForm action returns (see {@link CopySystemFormResult}).
 */
export class CopySystemFormResponse extends OrganizationResponse {
  constructor(public result: CopySystemFormResult) {
    super("CopySystemForm");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CopySystemFormResponse {
    return new CopySystemFormResponse((data ?? null) as CopySystemFormResult);
  }
}
