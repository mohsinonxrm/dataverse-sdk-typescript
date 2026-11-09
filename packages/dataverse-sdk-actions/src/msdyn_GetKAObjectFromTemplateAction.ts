import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetKAObjectFromTemplate action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_GetKAObjectFromTemplateResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_GetKAObjectFromTemplateResponse;
  }
}
