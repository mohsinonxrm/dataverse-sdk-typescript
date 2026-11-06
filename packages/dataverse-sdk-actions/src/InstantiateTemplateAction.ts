import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the InstantiateTemplate action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type InstantiateTemplateResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the InstantiateTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateTemplateActionParameters {
  TemplateId: string;
  ObjectType: string;
  ObjectId: string;
}

/**
 * InstantiateTemplate action
 *
 * Unbound action
 */
export class InstantiateTemplateAction implements Executable<InstantiateTemplateResponse> {
  constructor(public readonly parameters: InstantiateTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplate`;

    const body = requestBody({
      TemplateId: this.parameters.TemplateId,
      ObjectType: this.parameters.ObjectType,
      ObjectId: this.parameters.ObjectId,
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: InstantiateTemplateResponse }).value;
  }
}
