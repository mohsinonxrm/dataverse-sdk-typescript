import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from querystructureddatastream action
 */
export interface querystructureddatastreamResponse {
  response: string;
}

/**
 * querystructureddatastream action
 *
 * Unbound action
 */
export class querystructureddatastreamAction implements Executable<querystructureddatastreamResponse> {
  constructor(
    public readonly maxRows: number,
    public readonly options: string[],
    public readonly additionalProperties: string,
    public readonly skill: string,
    public readonly queryText: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/querystructureddatastream`;

    const body: Record<string, unknown> = {
      maxRows: this.maxRows,
      options: this.options,
      additionalProperties: this.additionalProperties,
      skill: this.skill,
      queryText: this.queryText,
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

  async parseResponse(response: Response): Promise<querystructureddatastreamResponse> {
    const data = await response.json();
    return data as querystructureddatastreamResponse;
  }
}
