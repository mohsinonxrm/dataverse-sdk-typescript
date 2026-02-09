import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_QueryExchange request message
 *
 * Web API Action: msdyn_QueryExchange
 */
export class msdyn_QueryExchangeRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueryExchangeResponse>
{
  constructor(
    public method: string,
    public body: string,
    public requesturl: string
  ) {
    super("msdyn_QueryExchange");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryExchange`;

    const body: Record<string, unknown> = {
      method: this.method,
      body: this.body,
      requesturl: this.requesturl,
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

  async parseResponse(response: Response): Promise<msdyn_QueryExchangeResponse> {
    const data = await response.json();
    return msdyn_QueryExchangeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      method: this.method,
      body: this.body,
      requesturl: this.requesturl,
    };
  }
}

/**
 * msdyn_QueryExchange response message
 */
export class msdyn_QueryExchangeResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueryExchangeResponse) {
    super("msdyn_QueryExchange");
  }

  static fromResponse(data: unknown): msdyn_QueryExchangeResponse {
    return new msdyn_QueryExchangeResponse((data as any).value);
  }
}
