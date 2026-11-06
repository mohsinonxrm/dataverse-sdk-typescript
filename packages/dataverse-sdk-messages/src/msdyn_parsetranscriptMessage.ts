import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_parsetranscriptResponse as msdyn_parsetranscriptResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_parsetranscript message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_parsetranscriptRequestParameters {
  annotationid: string;
}

/**
 * msdyn_parsetranscript request message
 *
 * Web API Action: msdyn_parsetranscript
 */
export class msdyn_parsetranscriptRequest
  extends OrganizationRequest
  implements Executable<msdyn_parsetranscriptResponse>
{
  declare readonly Parameters: Readonly<msdyn_parsetranscriptRequestParameters>;

  constructor(parameters: msdyn_parsetranscriptRequestParameters) {
    super("msdyn_parsetranscript", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_parsetranscript`;

    const body = requestBody({
      annotationid: this.Parameters.annotationid,
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

  async parseResponse(response: Response): Promise<msdyn_parsetranscriptResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_parsetranscriptResponse.fromResponse({});
    return msdyn_parsetranscriptResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_parsetranscript response message
 */
export class msdyn_parsetranscriptResponse extends OrganizationResponse {
  constructor(public result: msdyn_parsetranscriptResponseData) {
    super("msdyn_parsetranscript");
  }

  static fromResponse(data: unknown): msdyn_parsetranscriptResponse {
    return new msdyn_parsetranscriptResponse(
      responseObject<msdyn_parsetranscriptResponseData>(data)
    );
  }
}
