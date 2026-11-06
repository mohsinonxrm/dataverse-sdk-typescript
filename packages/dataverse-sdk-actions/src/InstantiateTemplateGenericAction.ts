import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from InstantiateTemplateGeneric action
 */
export interface InstantiateTemplateGenericResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InstantiateTemplateGenericResponse;
    return (await response.json()) as InstantiateTemplateGenericResponse;
  }
}
