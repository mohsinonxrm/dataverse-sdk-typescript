import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from InstantiateTemplate action
 */
export interface InstantiateTemplateResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InstantiateTemplateResponse;
    return (await response.json()) as InstantiateTemplateResponse;
  }
}
