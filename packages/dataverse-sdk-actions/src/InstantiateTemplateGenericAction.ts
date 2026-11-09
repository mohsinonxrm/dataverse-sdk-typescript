import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the InstantiateTemplateGeneric action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateTemplateGenericResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the InstantiateTemplateGeneric action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateGenericActionParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
  EntityLogicalName?: string;
}

/**
 * InstantiateTemplateGeneric action
 *
 * Unbound action
 */
export class InstantiateTemplateGenericAction implements Executable<InstantiateTemplateGenericResponse> {
  constructor(public readonly parameters: InstantiateTemplateGenericActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplateGeneric`;

    const body = requestBody({
      TemplateId: this.parameters.TemplateId,
      ObjectType: this.parameters.ObjectType,
      ObjectId: this.parameters.ObjectId,
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

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: InstantiateTemplateGenericResponse }).value;
  }
}
