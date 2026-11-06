import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { querystructureddatastreamResponse as querystructureddatastreamResponseData } from "./types/index.js";

/**
 * Parameters of the querystructureddatastream message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface querystructureddatastreamRequestParameters {
  maxRows: number;
  options: string[];
  additionalProperties: string;
  skill: string;
  queryText: string;
}

/**
 * querystructureddatastream request message
 *
 * Web API Action: querystructureddatastream
 */
export class querystructureddatastreamRequest
  extends OrganizationRequest
  implements Executable<querystructureddatastreamResponse>
{
  declare readonly Parameters: Readonly<querystructureddatastreamRequestParameters>;

  constructor(parameters: querystructureddatastreamRequestParameters) {
    super("querystructureddatastream", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/querystructureddatastream`;

    const body = requestBody({
      maxRows: this.Parameters.maxRows,
      options: this.Parameters.options,
      additionalProperties: this.Parameters.additionalProperties,
      skill: this.Parameters.skill,
      queryText: this.Parameters.queryText,
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

  async parseResponse(response: Response): Promise<querystructureddatastreamResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return querystructureddatastreamResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * querystructureddatastream response message
 */
export class querystructureddatastreamResponse extends OrganizationResponse {
  constructor(public result: querystructureddatastreamResponseData) {
    super("querystructureddatastream");
  }

  static fromResponse(data: unknown): querystructureddatastreamResponse {
    return new querystructureddatastreamResponse(
      responseObject<querystructureddatastreamResponseData>(data)
    );
  }
}
