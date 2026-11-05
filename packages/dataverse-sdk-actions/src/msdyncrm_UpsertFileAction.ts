import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyncrm_UpsertFile action
 */
export interface msdyncrm_UpsertFileResponse {
  OutputFile: string;
}

/**
 * msdyncrm_UpsertFile action
 *
 * Unbound action
 */
export class msdyncrm_UpsertFileAction implements Executable<msdyncrm_UpsertFileResponse> {
  constructor(
    public readonly inputFile: string,
    public readonly inputKeywords: string
  ) {}

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
    return data as msdyncrm_UpsertFileResponse;
  }
}
