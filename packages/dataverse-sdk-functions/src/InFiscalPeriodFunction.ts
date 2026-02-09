import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from InFiscalPeriod function
 */
export interface InFiscalPeriodResponse {
  value: boolean;
}

/**
 * InFiscalPeriod function
 *
 * Unbound function
 */
export class InFiscalPeriodFunction implements Executable<InFiscalPeriodResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValue: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InFiscalPeriod`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append(
        "@p1",
        typeof this.propertyName === "string" ? `'${this.propertyName}'` : String(this.propertyName)
      );
    }
    if (this.propertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append(
        "@p2",
        typeof this.propertyValue === "string"
          ? `'${this.propertyValue}'`
          : String(this.propertyValue)
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

  async parseResponse(response: Response): Promise<InFiscalPeriodResponse> {
    const data = await response.json();
    return data as InFiscalPeriodResponse;
  }
}
