import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * querystructureddatastream request message
 *
 * Web API Action: querystructureddatastream
 */
export class querystructureddatastreamRequest
  extends OrganizationRequest
  implements Executable<querystructureddatastreamResponse>
{
  constructor(
    public maxRows: number,
    public options: string[],
    public additionalProperties: string,
    public skill: string,
    public queryText: string
  ) {
    super("querystructureddatastream");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<querystructureddatastreamResponse> {
    const data = await response.json();
    return querystructureddatastreamResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      maxRows: this.maxRows,
      options: this.options,
      additionalProperties: this.additionalProperties,
      skill: this.skill,
      queryText: this.queryText,
    };
  }
}

/**
 * querystructureddatastream response message
 */
export class querystructureddatastreamResponse extends OrganizationResponse {
  constructor(public result: querystructureddatastreamResponse) {
    super("querystructureddatastream");
  }

  static fromResponse(data: unknown): querystructureddatastreamResponse {
    return new querystructureddatastreamResponse((data as any).value);
  }
}
