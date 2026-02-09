import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RemoveActiveCustomizations function
 */
export interface RemoveActiveCustomizationsResponse {
  Result: boolean;
}

/**
 * RemoveActiveCustomizations function
 *
 * Unbound function
 */
export class RemoveActiveCustomizationsFunction implements Executable<RemoveActiveCustomizationsResponse> {
  constructor(
    public readonly solutionComponentName: string,
    public readonly componentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RemoveActiveCustomizations`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.solutionComponentName !== undefined) {
      aliases.push(`SolutionComponentName=@p1`);
      params.append(
        "@p1",
        typeof this.solutionComponentName === "string"
          ? `'${this.solutionComponentName}'`
          : String(this.solutionComponentName)
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationsResponse> {
    const data = await response.json();
    return data as RemoveActiveCustomizationsResponse;
  }
}
