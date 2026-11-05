import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from IsComponentCustomizable function
 */
export interface IsComponentCustomizableResponse {
  IsComponentCustomizable: boolean;
}

/**
 * IsComponentCustomizable function
 *
 * Unbound function
 */
export class IsComponentCustomizableFunction implements Executable<IsComponentCustomizableResponse> {
  constructor(
    public readonly componentId: string,
    public readonly componentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsComponentCustomizable`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.componentId !== undefined) {
      aliases.push(`ComponentId=@p1`);
      params.append("@p1", formatParameterAlias(this.componentId, "Edm.Guid"));
    }
    if (this.componentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.componentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<IsComponentCustomizableResponse> {
    const data = await response.json();
    return data as IsComponentCustomizableResponse;
  }
}
