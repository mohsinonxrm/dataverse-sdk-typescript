import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveDistanceMatrixResponse as msdyn_RetrieveDistanceMatrixResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveDistanceMatrix message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveDistanceMatrixRequestParameters {
  Version?: string;
  Sources: Record<string, unknown>[];
  Targets: Record<string, unknown>[];
}

/**
 * msdyn_RetrieveDistanceMatrix request message
 *
 * Web API Action: msdyn_RetrieveDistanceMatrix
 */
export class msdyn_RetrieveDistanceMatrixRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveDistanceMatrixResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveDistanceMatrixRequestParameters>;

  constructor(parameters: msdyn_RetrieveDistanceMatrixRequestParameters) {
    super("msdyn_RetrieveDistanceMatrix", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveDistanceMatrix`;

    const body = requestBody({
      Version: this.Parameters.Version,
      Sources: this.Parameters.Sources,
      Targets: this.Parameters.Targets,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveDistanceMatrixResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveDistanceMatrixResponse.fromResponse({});
    return msdyn_RetrieveDistanceMatrixResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveDistanceMatrix response message
 */
export class msdyn_RetrieveDistanceMatrixResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveDistanceMatrixResponseData) {
    super("msdyn_RetrieveDistanceMatrix");
  }

  static fromResponse(data: unknown): msdyn_RetrieveDistanceMatrixResponse {
    return new msdyn_RetrieveDistanceMatrixResponse(
      responseObject<msdyn_RetrieveDistanceMatrixResponseData>(data)
    );
  }
}
