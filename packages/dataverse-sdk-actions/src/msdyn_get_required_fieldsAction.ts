import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_get_required_fields action
 */
export interface msdyn_get_required_fieldsResponse {
  table_primary_key: string;
  table_primary_field: string;
  table_id: string;
  table_plural_name: string;
  eligible_primary_keys: string[];
  eligible_primary_fields: string[];
  table_display_name: string;
  table_schema_name: string;
}

/**
 * msdyn_get_required_fields action
 *
 * Unbound action
 */
export class msdyn_get_required_fieldsAction implements Executable<msdyn_get_required_fieldsResponse> {
  constructor(
    public readonly table_id: string,
    public readonly dataset_value: string,
    public readonly connection_id: string,
    public readonly connector_id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_get_required_fields`;

    const body: Record<string, unknown> = {
      table_id: this.table_id,
      dataset_value: this.dataset_value,
      connection_id: this.connection_id,
      connector_id: this.connector_id,
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

  async parseResponse(response: Response): Promise<msdyn_get_required_fieldsResponse> {
    const data = await response.json();
    return data as msdyn_get_required_fieldsResponse;
  }
}
