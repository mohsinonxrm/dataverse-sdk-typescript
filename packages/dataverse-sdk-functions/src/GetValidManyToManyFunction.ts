import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetValidManyToMany function
 */
export interface GetValidManyToManyResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetValidManyToManyResponse;
  }
}
