import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_GetKAObjectFromTemplate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKAObjectFromTemplateActionParameters {
  TemplateId: string;
}

/**
 * msdyn_GetKAObjectFromTemplate action
 *
 * Unbound action
 */
export class msdyn_GetKAObjectFromTemplateAction implements Executable<msdyn_GetKAObjectFromTemplateResponse> {
  constructor(public readonly parameters: msdyn_GetKAObjectFromTemplateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKAObjectFromTemplate`;

    const body = requestBody({
      TemplateId: this.parameters.TemplateId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKAObjectFromTemplateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKAObjectFromTemplateResponse;
    return (await response.json()) as msdyn_GetKAObjectFromTemplateResponse;
  }
}
