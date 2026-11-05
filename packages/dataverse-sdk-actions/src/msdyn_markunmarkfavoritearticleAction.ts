import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_markunmarkfavoritearticle action
 */
export interface msdyn_markunmarkfavoritearticleResponse {
  msdyn_response: string;
}

/**
 * msdyn_markunmarkfavoritearticle action
 *
 * Unbound action
 */
export class msdyn_markunmarkfavoritearticleAction implements Executable<msdyn_markunmarkfavoritearticleResponse> {
  constructor(
    public readonly msdyn_knowledgearticleid: string,
    public readonly msdyn_userid: string,
    public readonly msdyn_actionname: string
  ) {}

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
    return data as msdyn_markunmarkfavoritearticleResponse;
  }
}
