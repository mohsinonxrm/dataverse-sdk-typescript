import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the InstantiateHtmlContent action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateHtmlContentResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the InstantiateHtmlContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateHtmlContentActionParameters {
  SubjectHTML?: string;
  BodyHTML?: string;
  TemplateId?: string;
  ObjectType: string;
  ObjectId: string;
  Options?: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateHtmlContent action
 *
 * Unbound action
 */
export class InstantiateHtmlContentAction implements Executable<InstantiateHtmlContentResponse> {
  constructor(public readonly parameters: InstantiateHtmlContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateHtmlContent`;

    const body = requestBody({
      SubjectHTML: this.parameters.SubjectHTML,
      BodyHTML: this.parameters.BodyHTML,
      TemplateId: this.parameters.TemplateId,
      ObjectType: this.parameters.ObjectType,
      ObjectId: this.parameters.ObjectId,
      Options: this.parameters.Options,
      EntityLogicalName: this.parameters.EntityLogicalName,
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: InstantiateHtmlContentResponse }).value;
  }
}
