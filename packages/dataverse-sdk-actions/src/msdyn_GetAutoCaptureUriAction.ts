import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAutoCaptureUri action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAutoCaptureUriResponse {
  "@odata.context"?: string;
  uri: string;
}

/**
 * Parameters of the msdyn_GetAutoCaptureUri action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAutoCaptureUriActionParameters {
  uriType: string;
}

/**
 * msdyn_GetAutoCaptureUri action
 *
 * Unbound action
 */
export class msdyn_GetAutoCaptureUriAction implements Executable<msdyn_GetAutoCaptureUriResponse> {
  constructor(public readonly parameters: msdyn_GetAutoCaptureUriActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutoCaptureUri`;

    const body = requestBody({
      uriType: this.parameters.uriType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutoCaptureUriResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAutoCaptureUriResponse;
  }
}
