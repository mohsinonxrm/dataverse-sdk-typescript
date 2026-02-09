import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetComponentManagedIdentityFIC function
 */
export interface GetComponentManagedIdentityFICResponse {
  FICSubject: string;
}

/**
 * GetComponentManagedIdentityFIC function
 *
 * Unbound function
 */
export class GetComponentManagedIdentityFICFunction implements Executable<GetComponentManagedIdentityFICResponse> {
  constructor(
    public readonly componentName: string,
    public readonly componentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetComponentManagedIdentityFIC`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.componentName !== undefined) {
      aliases.push(`ComponentName=@p1`);
      params.append(
        "@p1",
        typeof this.componentName === "string"
          ? `'${this.componentName}'`
          : String(this.componentName)
      );
    }
    if (this.componentId !== undefined) {
      aliases.push(`ComponentId=@p2`);
      params.append(
        "@p2",
        typeof this.componentId === "string" ? `'${this.componentId}'` : String(this.componentId)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetComponentManagedIdentityFICResponse> {
    const data = await response.json();
    return data as GetComponentManagedIdentityFICResponse;
  }
}
