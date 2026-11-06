import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyncrm_UpsertFileResponse as msdyncrm_UpsertFileResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyncrm_UpsertFileResponse.fromResponse({});
    return msdyncrm_UpsertFileResponse.fromResponse(await response.json());
  }
}

/**
 * msdyncrm_UpsertFile response message
 */
export class msdyncrm_UpsertFileResponse extends OrganizationResponse {
  constructor(public result: msdyncrm_UpsertFileResponseData) {
    super("msdyncrm_UpsertFile");
  }

  static fromResponse(data: unknown): msdyncrm_UpsertFileResponse {
    return new msdyncrm_UpsertFileResponse(responseObject<msdyncrm_UpsertFileResponseData>(data));
  }
}
