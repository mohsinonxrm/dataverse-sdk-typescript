import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_BusinessClosureDeleteResponse as msdyn_BusinessClosureDeleteResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BusinessClosureDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureDeleteRequestParameters {
  Ids: string;
}

/**
 * msdyn_BusinessClosureDelete request message
 *
 * Web API Action: msdyn_BusinessClosureDelete
 */
export class msdyn_BusinessClosureDeleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureDeleteResponse>
{
  declare readonly Parameters: Readonly<msdyn_BusinessClosureDeleteRequestParameters>;

  constructor(parameters: msdyn_BusinessClosureDeleteRequestParameters) {
    super("msdyn_BusinessClosureDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureDelete`;

    const body = requestBody({
      Ids: this.Parameters.Ids,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureDeleteResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_BusinessClosureDeleteResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_BusinessClosureDelete response message
 */
export class msdyn_BusinessClosureDeleteResponse extends OrganizationResponse {
  constructor(public result: msdyn_BusinessClosureDeleteResponseData) {
    super("msdyn_BusinessClosureDelete");
  }

  static fromResponse(data: unknown): msdyn_BusinessClosureDeleteResponse {
    return new msdyn_BusinessClosureDeleteResponse(
      responseObject<msdyn_BusinessClosureDeleteResponseData>(data)
    );
  }
}
