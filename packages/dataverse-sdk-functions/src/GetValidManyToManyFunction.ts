import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetValidManyToMany function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetValidManyToManyResponse {
  "@odata.context"?: string;
  EntityNames: string[];
}

/**
 * GetValidManyToMany function
 *
 * Unbound function
 */
export class GetValidManyToManyFunction implements Executable<GetValidManyToManyResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidManyToMany`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetValidManyToManyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetValidManyToManyResponse;
  }
}
