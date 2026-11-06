import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from InstantiateHtmlContent action
 */
export interface InstantiateHtmlContentResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InstantiateHtmlContentResponse;
    return (await response.json()) as InstantiateHtmlContentResponse;
  }
}
