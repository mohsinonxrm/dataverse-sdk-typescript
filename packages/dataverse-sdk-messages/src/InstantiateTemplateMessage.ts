import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateTemplate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateRequestParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
}

/**
 * InstantiateTemplate request message
 *
 * Web API Action: InstantiateTemplate
 */
export class InstantiateTemplateRequest
  extends OrganizationRequest
  implements Executable<InstantiateTemplateResponse>
{
  declare readonly Parameters: Readonly<InstantiateTemplateRequestParameters>;

  constructor(parameters: InstantiateTemplateRequestParameters) {
    super("InstantiateTemplate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplate`;

    const body = requestBody({
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return InstantiateTemplateResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return InstantiateTemplateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InstantiateTemplate action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateTemplateResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * InstantiateTemplate response message
 *
 * `result` is the value the InstantiateTemplate action returns (see {@link InstantiateTemplateResult}).
 */
export class InstantiateTemplateResponse extends OrganizationResponse {
  constructor(public result: InstantiateTemplateResult) {
    super("InstantiateTemplate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InstantiateTemplateResponse {
    return new InstantiateTemplateResponse(
      data === undefined ? [] : (data as { value: InstantiateTemplateResult }).value
    );
  }
}
