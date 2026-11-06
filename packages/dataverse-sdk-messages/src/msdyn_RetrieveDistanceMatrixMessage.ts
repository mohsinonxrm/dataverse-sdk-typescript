import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveDistanceMatrixResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveDistanceMatrix action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveDistanceMatrixResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
}

/**
 * msdyn_RetrieveDistanceMatrix response message
 *
 * `result` is the value the msdyn_RetrieveDistanceMatrix action returns (see {@link msdyn_RetrieveDistanceMatrixResult}).
 */
export class msdyn_RetrieveDistanceMatrixResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveDistanceMatrixResult) {
    super("msdyn_RetrieveDistanceMatrix");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveDistanceMatrixResponse {
    return new msdyn_RetrieveDistanceMatrixResponse(data as msdyn_RetrieveDistanceMatrixResult);
  }
}
