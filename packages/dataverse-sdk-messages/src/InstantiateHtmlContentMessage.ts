import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the InstantiateHtmlContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateHtmlContentRequestParameters {
  SubjectHTML?: string;
  BodyHTML?: string;
  TemplateId?: string;
  ObjectType: string;
  ObjectId: string;
  Options?: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateHtmlContent request message
 *
 * Web API Action: InstantiateHtmlContent
 */
export class InstantiateHtmlContentRequest
  extends OrganizationRequest
  implements Executable<InstantiateHtmlContentResponse>
{
  declare readonly Parameters: Readonly<InstantiateHtmlContentRequestParameters>;

  constructor(parameters: InstantiateHtmlContentRequestParameters) {
    super("InstantiateHtmlContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateHtmlContent`;

    const body = requestBody({
      SubjectHTML: this.Parameters.SubjectHTML,
      BodyHTML: this.Parameters.BodyHTML,
      TemplateId: this.Parameters.TemplateId,
      ObjectType: this.Parameters.ObjectType,
      ObjectId: this.Parameters.ObjectId,
      Options: this.Parameters.Options,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<InstantiateHtmlContentResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return InstantiateHtmlContentResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return InstantiateHtmlContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the InstantiateHtmlContent action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateHtmlContentResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * InstantiateHtmlContent response message
 *
 * `result` is the value the InstantiateHtmlContent action returns (see {@link InstantiateHtmlContentResult}).
 */
export class InstantiateHtmlContentResponse extends OrganizationResponse {
  constructor(public result: InstantiateHtmlContentResult) {
    super("InstantiateHtmlContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): InstantiateHtmlContentResponse {
    return new InstantiateHtmlContentResponse(
      data === undefined ? [] : (data as { value: InstantiateHtmlContentResult }).value
    );
  }
}
