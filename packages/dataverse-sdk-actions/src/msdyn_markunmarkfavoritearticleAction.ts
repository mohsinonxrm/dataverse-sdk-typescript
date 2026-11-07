import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_markunmarkfavoritearticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_markunmarkfavoritearticleResponse {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_markunmarkfavoritearticle action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_markunmarkfavoritearticleActionParameters {
  msdyn_knowledgearticleid: string;
  msdyn_actionname: string;
  msdyn_userid: string;
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
      msdyn_actionname: this.parameters.msdyn_actionname,
      msdyn_userid: this.parameters.msdyn_userid,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_markunmarkfavoritearticleResponse;
  }
}
