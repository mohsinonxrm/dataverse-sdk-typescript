import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveDistanceMatrix request message
 *
 * Web API Action: msdyn_RetrieveDistanceMatrix
 */
export class msdyn_RetrieveDistanceMatrixRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveDistanceMatrixResponse>
{
  constructor(
    public version: string,
    public sources: Record<string, unknown>[],
    public targets: Record<string, unknown>[]
  ) {
    super("msdyn_RetrieveDistanceMatrix");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveDistanceMatrix`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Sources: this.sources,
      Targets: this.targets,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveDistanceMatrixResponse> {
    const data = await response.json();
    return msdyn_RetrieveDistanceMatrixResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      Sources: this.sources,
      Targets: this.targets,
    };
  }
}

/**
 * msdyn_RetrieveDistanceMatrix response message
 */
export class msdyn_RetrieveDistanceMatrixResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveDistanceMatrixResponse) {
    super("msdyn_RetrieveDistanceMatrix");
  }

  static fromResponse(data: unknown): msdyn_RetrieveDistanceMatrixResponse {
    return new msdyn_RetrieveDistanceMatrixResponse((data as any).value);
  }
}
