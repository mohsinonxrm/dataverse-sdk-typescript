import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyncrm_UpsertFileResponse> {
    const data = await response.json();
    return msdyncrm_UpsertFileResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputFile: this.inputFile,
      InputKeywords: this.inputKeywords,
    };
  }
}

/**
 * msdyncrm_UpsertFile response message
 */
export class msdyncrm_UpsertFileResponse extends OrganizationResponse {
  constructor(public result: msdyncrm_UpsertFileResponse) {
    super("msdyncrm_UpsertFile");
  }

  static fromResponse(data: unknown): msdyncrm_UpsertFileResponse {
    return new msdyncrm_UpsertFileResponse((data as any).value);
  }
}
