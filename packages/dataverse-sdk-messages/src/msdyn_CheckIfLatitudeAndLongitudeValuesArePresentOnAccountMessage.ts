import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse as msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount request message
 *
 * Web API Action: msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount
 */
export class msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequestParameters>;

  constructor(
    parameters: msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequestParameters
  ) {
    super("msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount response message
 */
export class msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponseData
  ) {
    super("msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse {
    return new msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse(
      responseObject<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponseData>(data)
    );
  }
}
