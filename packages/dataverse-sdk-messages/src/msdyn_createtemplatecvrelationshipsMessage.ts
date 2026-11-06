import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_createtemplatecvrelationshipsResponse as msdyn_createtemplatecvrelationshipsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_createtemplatecvrelationships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_createtemplatecvrelationshipsRequestParameters {
  msdyn_templaterulesetid: string;
}

/**
 * msdyn_createtemplatecvrelationships request message
 *
 * Web API Action: msdyn_createtemplatecvrelationships
 */
export class msdyn_createtemplatecvrelationshipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_createtemplatecvrelationshipsResponse>
{
  declare readonly Parameters: Readonly<msdyn_createtemplatecvrelationshipsRequestParameters>;

  constructor(parameters: msdyn_createtemplatecvrelationshipsRequestParameters) {
    super("msdyn_createtemplatecvrelationships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createtemplatecvrelationships`;

    const body = requestBody({
      msdyn_templaterulesetid: this.Parameters.msdyn_templaterulesetid,
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

  async parseResponse(response: Response): Promise<msdyn_createtemplatecvrelationshipsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_createtemplatecvrelationshipsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_createtemplatecvrelationships response message
 */
export class msdyn_createtemplatecvrelationshipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_createtemplatecvrelationshipsResponseData) {
    super("msdyn_createtemplatecvrelationships");
  }

  static fromResponse(data: unknown): msdyn_createtemplatecvrelationshipsResponse {
    return new msdyn_createtemplatecvrelationshipsResponse(
      responseObject<msdyn_createtemplatecvrelationshipsResponseData>(data)
    );
  }
}
