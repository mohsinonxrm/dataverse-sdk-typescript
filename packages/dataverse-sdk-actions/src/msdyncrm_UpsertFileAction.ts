import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyncrm_UpsertFile action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyncrm_UpsertFileResponse {
  "@odata.context"?: string;
  OutputFile: string;
}

/**
 * Parameters of the msdyncrm_UpsertFile action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyncrm_UpsertFileActionParameters {
  InputFile: string;
  InputKeywords?: string;
}

/**
 * msdyncrm_UpsertFile action
 *
 * Unbound action
 */
export class msdyncrm_UpsertFileAction implements Executable<msdyncrm_UpsertFileResponse> {
  constructor(public readonly parameters: msdyncrm_UpsertFileActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_UpsertFile`;

    const body = requestBody({
      InputFile: this.parameters.InputFile,
      InputKeywords: this.parameters.InputKeywords,
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

  async parseResponse(response: Response): Promise<msdyncrm_UpsertFileResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyncrm_UpsertFileResponse;
  }
}
