import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfTerritoryRecordsExistResponse as msdyn_CheckIfTerritoryRecordsExistResponseData } from "./types/index.js";

/**
 * msdyn_CheckIfTerritoryRecordsExist request message
 *
 * Web API Action: msdyn_CheckIfTerritoryRecordsExist
 */
export class msdyn_CheckIfTerritoryRecordsExistRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfTerritoryRecordsExistResponse>
{
  constructor() {
    super("msdyn_CheckIfTerritoryRecordsExist");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfTerritoryRecordsExist`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfTerritoryRecordsExistResponse> {
    const data = await response.json();
    return msdyn_CheckIfTerritoryRecordsExistResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckIfTerritoryRecordsExist response message
 */
export class msdyn_CheckIfTerritoryRecordsExistResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfTerritoryRecordsExistResponseData) {
    super("msdyn_CheckIfTerritoryRecordsExist");
  }

  static fromResponse(data: unknown): msdyn_CheckIfTerritoryRecordsExistResponse {
    return new msdyn_CheckIfTerritoryRecordsExistResponse(
      responseObject<msdyn_CheckIfTerritoryRecordsExistResponseData>(data)
    );
  }
}
