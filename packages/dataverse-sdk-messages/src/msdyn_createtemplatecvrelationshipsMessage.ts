import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_createtemplatecvrelationships request message
 *
 * Web API Action: msdyn_createtemplatecvrelationships
 */
export class msdyn_createtemplatecvrelationshipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_createtemplatecvrelationshipsResponse>
{
  constructor(public msdyn_templaterulesetid: string) {
    super("msdyn_createtemplatecvrelationships");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createtemplatecvrelationships`;

    const body: Record<string, unknown> = {
      msdyn_templaterulesetid: this.msdyn_templaterulesetid,
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

  async parseResponse(response: Response): Promise<msdyn_createtemplatecvrelationshipsResponse> {
    const data = await response.json();
    return msdyn_createtemplatecvrelationshipsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_templaterulesetid: this.msdyn_templaterulesetid,
    };
  }
}

/**
 * msdyn_createtemplatecvrelationships response message
 */
export class msdyn_createtemplatecvrelationshipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_createtemplatecvrelationshipsResponse) {
    super("msdyn_createtemplatecvrelationships");
  }

  static fromResponse(data: unknown): msdyn_createtemplatecvrelationshipsResponse {
    return new msdyn_createtemplatecvrelationshipsResponse((data as any).value);
  }
}
