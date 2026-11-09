import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_markunmarkfavoritearticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_markunmarkfavoritearticleRequestParameters {
  msdyn_knowledgearticleid: string;
  msdyn_actionname: string;
  msdyn_userid: string;
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
      msdyn_actionname: this.Parameters.msdyn_actionname,
      msdyn_userid: this.Parameters.msdyn_userid,
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
    return msdyn_markunmarkfavoritearticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_markunmarkfavoritearticle action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_markunmarkfavoritearticleResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_markunmarkfavoritearticle response message
 *
 * `result` is the value the msdyn_markunmarkfavoritearticle action returns (see {@link msdyn_markunmarkfavoritearticleResult}).
 */
export class msdyn_markunmarkfavoritearticleResponse extends OrganizationResponse {
  constructor(public result: msdyn_markunmarkfavoritearticleResult) {
    super("msdyn_markunmarkfavoritearticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_markunmarkfavoritearticleResponse {
    return new msdyn_markunmarkfavoritearticleResponse(
      data as msdyn_markunmarkfavoritearticleResult
    );
  }
}
