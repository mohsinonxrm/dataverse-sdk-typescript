import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from InstantiateTemplateGeneric action
 */
export interface InstantiateTemplateGenericResponse {
  value: EntityReference[];
}

/**
 * InstantiateTemplateGeneric action
 *
 * Unbound action
 */
export class InstantiateTemplateGenericAction implements Executable<InstantiateTemplateGenericResponse> {
  constructor(
    public readonly templateId: string,
    public readonly objectType: string,
    public readonly objectId: string,
    public readonly entityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplateGeneric`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
      EntityLogicalName: this.entityLogicalName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InstantiateTemplateGenericResponse> {
    const data = await response.json();
    return data as InstantiateTemplateGenericResponse;
  }
}
