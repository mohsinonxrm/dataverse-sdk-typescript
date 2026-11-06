import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyncrm_UpsertFile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyncrm_UpsertFileRequestParameters {
  InputFile: string;
  InputKeywords?: string;
}

/**
 * msdyncrm_UpsertFile request message
 *
 * Web API Action: msdyncrm_UpsertFile
 */
export class msdyncrm_UpsertFileRequest
  extends OrganizationRequest
  implements Executable<msdyncrm_UpsertFileResponse>
{
  declare readonly Parameters: Readonly<msdyncrm_UpsertFileRequestParameters>;

  constructor(parameters: msdyncrm_UpsertFileRequestParameters) {
    super("msdyncrm_UpsertFile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_UpsertFile`;

    const body = requestBody({
      InputFile: this.Parameters.InputFile,
      InputKeywords: this.Parameters.InputKeywords,
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
    return msdyncrm_UpsertFileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyncrm_UpsertFile action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyncrm_UpsertFileResult {
  "@odata.context"?: string;
  OutputFile: string;
}

/**
 * msdyncrm_UpsertFile response message
 *
 * `result` is the value the msdyncrm_UpsertFile action returns (see {@link msdyncrm_UpsertFileResult}).
 */
export class msdyncrm_UpsertFileResponse extends OrganizationResponse {
  constructor(public result: msdyncrm_UpsertFileResult) {
    super("msdyncrm_UpsertFile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyncrm_UpsertFileResponse {
    return new msdyncrm_UpsertFileResponse(data as msdyncrm_UpsertFileResult);
  }
}
