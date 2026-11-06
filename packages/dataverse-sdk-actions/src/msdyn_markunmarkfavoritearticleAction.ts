import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_markunmarkfavoritearticle action
 */
export interface msdyn_markunmarkfavoritearticleResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_markunmarkfavoritearticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_markunmarkfavoritearticleActionParameters {
  msdyn_knowledgearticleid: string;
  msdyn_userid: string;
  msdyn_actionname: string;
}

/**
 * msdyn_markunmarkfavoritearticle action
 *
 * Unbound action
 */
export class msdyn_markunmarkfavoritearticleAction implements Executable<msdyn_markunmarkfavoritearticleResponse> {
  constructor(public readonly parameters: msdyn_markunmarkfavoritearticleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_markunmarkfavoritearticle`;

    const body = requestBody({
      msdyn_knowledgearticleid: this.parameters.msdyn_knowledgearticleid,
      msdyn_userid: this.parameters.msdyn_userid,
      msdyn_actionname: this.parameters.msdyn_actionname,
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
    return (text ? JSON.parse(text) : {}) as msdyn_markunmarkfavoritearticleResponse;
  }
}
