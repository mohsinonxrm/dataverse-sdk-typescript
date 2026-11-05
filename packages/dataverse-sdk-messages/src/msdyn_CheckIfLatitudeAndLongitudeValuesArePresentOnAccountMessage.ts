import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse as msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount request message
 *
 * Web API Action: msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount
 */
export class msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccount`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse> {
    const data = await response.json();
    return msdyn_CheckIfLatitudeAndLongitudeValuesArePresentOnAccountResponse.fromResponse(data);
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
