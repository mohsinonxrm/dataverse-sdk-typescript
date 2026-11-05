import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetKAObjectFromTemplate action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_GetKAObjectFromTemplateResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
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
