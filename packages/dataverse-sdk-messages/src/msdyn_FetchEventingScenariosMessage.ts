import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FetchEventingScenariosResponse as msdyn_FetchEventingScenariosResponseData } from "./types/index.js";

/**
 * msdyn_FetchEventingScenarios request message
 *
 * Web API Action: msdyn_FetchEventingScenarios
 */
export class msdyn_FetchEventingScenariosRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchEventingScenariosResponse>
{
  constructor() {
    super("msdyn_FetchEventingScenarios");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEventingScenarios`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchEventingScenariosResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FetchEventingScenariosResponse.fromResponse({});
    return msdyn_FetchEventingScenariosResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FetchEventingScenarios response message
 */
export class msdyn_FetchEventingScenariosResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchEventingScenariosResponseData) {
    super("msdyn_FetchEventingScenarios");
  }

  static fromResponse(data: unknown): msdyn_FetchEventingScenariosResponse {
    return new msdyn_FetchEventingScenariosResponse(
      responseObject<msdyn_FetchEventingScenariosResponseData>(data)
    );
  }
}
