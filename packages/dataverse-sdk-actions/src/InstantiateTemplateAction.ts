import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from InstantiateTemplate action
 */
export interface InstantiateTemplateResponse {
  value: EntityReference[];
}

/**
 * InstantiateTemplate action
 *
 * Unbound action
 */
export class InstantiateTemplateAction implements Executable<InstantiateTemplateResponse> {
  constructor(
    public readonly templateId: string,
    public readonly objectType: string,
    public readonly objectId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InstantiateTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
      ObjectType: this.objectType,
      ObjectId: this.objectId,
    };

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
    const data = await response.json();
    return data as InstantiateTemplateResponse;
  }
}
