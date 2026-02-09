import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_markunmarkfavoritearticleResponse> {
    const data = await response.json();
    return msdyn_markunmarkfavoritearticleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_knowledgearticleid: this.msdyn_knowledgearticleid,
      msdyn_userid: this.msdyn_userid,
      msdyn_actionname: this.msdyn_actionname,
    };
  }
}

/**
 * msdyn_markunmarkfavoritearticle response message
 */
export class msdyn_markunmarkfavoritearticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_markunmarkfavoritearticleResponse) {
    super("msdyn_markunmarkfavoritearticle");
  }

  static fromResponse(data: unknown): msdyn_markunmarkfavoritearticleResponse {
    return new msdyn_markunmarkfavoritearticleResponse((data as any).value);
  }
}
