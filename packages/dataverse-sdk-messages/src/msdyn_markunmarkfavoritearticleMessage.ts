import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_markunmarkfavoritearticleResponse as msdyn_markunmarkfavoritearticleResponseData } from "./types/index.js";

/**
 * msdyn_markunmarkfavoritearticle request message
 *
 * Web API Action: msdyn_markunmarkfavoritearticle
 */
export class msdyn_markunmarkfavoritearticleRequest
  extends OrganizationRequest
  implements Executable<msdyn_markunmarkfavoritearticleResponse>
{
  constructor(
    public msdyn_knowledgearticleid: string,
    public msdyn_userid: string,
    public msdyn_actionname: string
  ) {
    super("msdyn_markunmarkfavoritearticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_markunmarkfavoritearticle`;

    const body: Record<string, unknown> = {
      msdyn_knowledgearticleid: this.msdyn_knowledgearticleid,
      msdyn_userid: this.msdyn_userid,
      msdyn_actionname: this.msdyn_actionname,
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

  async parseResponse(response: Response): Promise<msdyn_markunmarkfavoritearticleResponse> {
    const data = await response.json();
    return msdyn_markunmarkfavoritearticleResponse.fromResponse(data);
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
