import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_parsetranscript action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_parsetranscriptResponse {
  "@odata.context"?: string;
  content: string;
}

/**
 * Parameters of the msdyn_parsetranscript action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_parsetranscriptActionParameters {
  annotationid: string;
}

/**
 * msdyn_parsetranscript action
 *
 * Unbound action
 */
export class msdyn_parsetranscriptAction implements Executable<msdyn_parsetranscriptResponse> {
  constructor(public readonly parameters: msdyn_parsetranscriptActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_parsetranscript`;

    const body = requestBody({
      annotationid: this.parameters.annotationid,
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

  async parseResponse(response: Response): Promise<msdyn_parsetranscriptResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_parsetranscriptResponse;
  }
}
