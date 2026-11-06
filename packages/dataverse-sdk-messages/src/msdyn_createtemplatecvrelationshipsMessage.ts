import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_createtemplatecvrelationshipsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_createtemplatecvrelationships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_createtemplatecvrelationshipsResult {
  "@odata.context"?: string;
  status: boolean;
}

/**
 * msdyn_createtemplatecvrelationships response message
 *
 * `result` is the value the msdyn_createtemplatecvrelationships action returns (see {@link msdyn_createtemplatecvrelationshipsResult}).
 */
export class msdyn_createtemplatecvrelationshipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_createtemplatecvrelationshipsResult) {
    super("msdyn_createtemplatecvrelationships");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_createtemplatecvrelationshipsResponse {
    return new msdyn_createtemplatecvrelationshipsResponse(
      data as msdyn_createtemplatecvrelationshipsResult
    );
  }
}
