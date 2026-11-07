import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKAObjectFromTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKAObjectFromTemplateRequestParameters {
  TemplateId: string;
}

/**
 * msdyn_GetKAObjectFromTemplate request message
 *
 * Web API Action: msdyn_GetKAObjectFromTemplate
 */
export class msdyn_GetKAObjectFromTemplateRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKAObjectFromTemplateResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKAObjectFromTemplateRequestParameters>;

  constructor(parameters: msdyn_GetKAObjectFromTemplateRequestParameters) {
    super("msdyn_GetKAObjectFromTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKAObjectFromTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKAObjectFromTemplateResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_GetKAObjectFromTemplateResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_GetKAObjectFromTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKAObjectFromTemplate action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_GetKAObjectFromTemplateResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_GetKAObjectFromTemplate response message
 *
 * `result` is the value the msdyn_GetKAObjectFromTemplate action returns (see {@link msdyn_GetKAObjectFromTemplateResult}).
 */
export class msdyn_GetKAObjectFromTemplateResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKAObjectFromTemplateResult) {
    super("msdyn_GetKAObjectFromTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKAObjectFromTemplateResponse {
    return new msdyn_GetKAObjectFromTemplateResponse(
      (data ?? null) as msdyn_GetKAObjectFromTemplateResult
    );
  }
}
