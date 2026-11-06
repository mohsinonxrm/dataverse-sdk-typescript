import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_markunmarkfavoritearticleResponse as msdyn_markunmarkfavoritearticleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_markunmarkfavoritearticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_markunmarkfavoritearticleRequestParameters {
  msdyn_knowledgearticleid: string;
  msdyn_userid: string;
  msdyn_actionname: string;
}

/**
 * msdyn_markunmarkfavoritearticle request message
 *
 * Web API Action: msdyn_markunmarkfavoritearticle
 */
export class msdyn_markunmarkfavoritearticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_markunmarkfavoritearticleResponse>
{
  declare readonly Parameters: Readonly<msdyn_markunmarkfavoritearticleRequestParameters>;

  constructor(parameters: msdyn_markunmarkfavoritearticleRequestParameters) {
    super("msdyn_markunmarkfavoritearticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_markunmarkfavoritearticle`;

    const body = requestBody({
      msdyn_knowledgearticleid: this.Parameters.msdyn_knowledgearticleid,
      msdyn_userid: this.Parameters.msdyn_userid,
      msdyn_actionname: this.Parameters.msdyn_actionname,
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

  async parseResponse(response: Response): Promise<msdyn_markunmarkfavoritearticleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_markunmarkfavoritearticleResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_markunmarkfavoritearticle response message
 */
export class msdyn_markunmarkfavoritearticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_markunmarkfavoritearticleResponseData) {
    super("msdyn_markunmarkfavoritearticle");
  }

  static fromResponse(data: unknown): msdyn_markunmarkfavoritearticleResponse {
    return new msdyn_markunmarkfavoritearticleResponse(
      responseObject<msdyn_markunmarkfavoritearticleResponseData>(data)
    );
  }
}
