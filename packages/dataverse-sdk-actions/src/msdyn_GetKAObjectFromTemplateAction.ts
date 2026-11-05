import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetKAObjectFromTemplate action
 */
export interface msdyn_GetKAObjectFromTemplateResponse {
  value: EntityReference;
}

/**
 * msdyn_GetKAObjectFromTemplate action
 *
 * Unbound action
 */
export class msdyn_GetKAObjectFromTemplateAction implements Executable<msdyn_GetKAObjectFromTemplateResponse> {
  constructor(public readonly templateId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKAObjectFromTemplate`;

    const body: Record<string, unknown> = {
      TemplateId: this.templateId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKAObjectFromTemplateResponse> {
    const data = await response.json();
    return data as msdyn_GetKAObjectFromTemplateResponse;
  }
}
