import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyncrm_UpsertFileResponse as msdyncrm_UpsertFileResponseData } from "./types/index.js";

/**
 * msdyncrm_UpsertFile request message
 *
 * Web API Action: msdyncrm_UpsertFile
 */
export class msdyncrm_UpsertFileRequest
  extends OrganizationRequest
  implements Executable<msdyncrm_UpsertFileResponse>
{
  constructor(
    public inputFile: string,
    public inputKeywords: string
  ) {
    super("msdyncrm_UpsertFile");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyncrm_UpsertFile`;

    const body: Record<string, unknown> = {
      InputFile: this.inputFile,
      InputKeywords: this.inputKeywords,
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

  async parseResponse(response: Response): Promise<msdyncrm_UpsertFileResponse> {
    const data = await response.json();
    return msdyncrm_UpsertFileResponse.fromResponse(data);
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
