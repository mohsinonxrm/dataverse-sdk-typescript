import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from InOrAfterFiscalPeriodAndYear function
 */
export interface InOrAfterFiscalPeriodAndYearResponse {
  value: boolean;
}

/**
 * InOrAfterFiscalPeriodAndYear function
 *
 * Unbound function
 */
export class InOrAfterFiscalPeriodAndYearFunction implements Executable<InOrAfterFiscalPeriodAndYearResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValue1: number,
    public readonly propertyValue2: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InOrAfterFiscalPeriodAndYear`;

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
    if (this.propertyValue1 !== undefined) {
      aliases.push(`PropertyValue1=@p2`);
      params.append(
        "@p2",
        typeof this.propertyValue1 === "string"
          ? `'${this.propertyValue1}'`
          : String(this.propertyValue1)
      );
    }
    if (this.propertyValue2 !== undefined) {
      aliases.push(`PropertyValue2=@p3`);
      params.append(
        "@p3",
        typeof this.propertyValue2 === "string"
          ? `'${this.propertyValue2}'`
          : String(this.propertyValue2)
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

  async parseResponse(response: Response): Promise<InOrAfterFiscalPeriodAndYearResponse> {
    const data = await response.json();
    return data as InOrAfterFiscalPeriodAndYearResponse;
  }
}
