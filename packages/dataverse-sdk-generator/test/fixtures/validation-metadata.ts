/**
 * A fixture for the validation rules of #433: a table with a decimal column, currency columns on
 * each `PrecisionSource` (the column's `Precision`, the organization's pricing precision, the
 * record currency's precision), a floating point column, a date-only and a date and time column,
 * an image and a file column (`MaxSizeInKB`), and a state and status reason (`State` of each status
 * option), as RetrieveMetadataChanges returns them.
 */
import type {
  AttributeMetadataDetail,
  RetrieveMetadataChangesResponse,
} from "../../src/metadata-service.js";

export const VALIDATION_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="contoso_order" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="contoso_orderid" /></Key>
        <Property Name="contoso_orderid" Type="Edm.Guid" />
        <Property Name="contoso_name" Type="Edm.String" Unicode="false" />
        <Property Name="contoso_discount" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="contoso_amount" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="contoso_listprice" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="contoso_total" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="contoso_weight" Type="Edm.Double" />
        <Property Name="contoso_duedate" Type="Edm.Date" />
        <Property Name="contoso_shippedon" Type="Edm.DateTimeOffset" />
        <Property Name="contoso_photo" Type="Edm.Binary" />
        <Property Name="contoso_contract" Type="Edm.Guid" />
        <Property Name="statecode" Type="Edm.Int32" />
        <Property Name="statuscode" Type="Edm.Int32" />
      </EntityType>
      <EntityContainer Name="System">
        <EntitySet Name="contoso_orders" EntityType="Microsoft.Dynamics.CRM.contoso_order" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const label = (text: string) => ({ UserLocalizedLabel: { Label: text, LanguageCode: 1033 } });

function column(
  logicalName: string,
  attributeType: string,
  extra: Partial<AttributeMetadataDetail> = {}
): AttributeMetadataDetail {
  return {
    LogicalName: logicalName,
    SchemaName: logicalName,
    AttributeType: attributeType,
    IsValidForRead: true,
    IsValidForCreate: true,
    IsValidForUpdate: true,
    ...extra,
  };
}

export const VALIDATION_ENTITY_METADATA: Record<string, RetrieveMetadataChangesResponse> = {
  contoso_order: {
    EntityMetadata: [
      {
        LogicalName: "contoso_order",
        SchemaName: "contoso_Order",
        EntitySetName: "contoso_orders",
        PrimaryIdAttribute: "contoso_orderid",
        PrimaryNameAttribute: "contoso_name",
        Keys: [],
        Attributes: [
          column("contoso_orderid", "Uniqueidentifier", { IsValidForUpdate: false }),
          column("contoso_name", "String", { MaxLength: 100 }),
          column("contoso_discount", "Decimal", { Precision: 2, MinValue: 0, MaxValue: 100 }),
          // PrecisionSource 0: the column's Precision
          column("contoso_amount", "Money", { Precision: 1, PrecisionSource: 0 }),
          // PrecisionSource 1: the organization's pricing precision (Precision isn't the one used)
          column("contoso_listprice", "Money", { Precision: 2, PrecisionSource: 1 }),
          // PrecisionSource 2: the record currency's precision
          column("contoso_total", "Money", { Precision: 2, PrecisionSource: 2 }),
          // Floating point: no precision is written
          column("contoso_weight", "Double", { Precision: 2 }),
          column("contoso_duedate", "DateTime", {
            DateTimeBehavior: { Value: "DateOnly" },
            Format: "DateOnly",
          }),
          column("contoso_shippedon", "DateTime", {
            DateTimeBehavior: { Value: "UserLocal" },
            Format: "DateAndTime",
          }),
          column("contoso_photo", "Virtual", {
            AttributeTypeName: { Value: "ImageType" },
            MaxSizeInKB: 1,
          }),
          column("contoso_contract", "Virtual", {
            AttributeTypeName: { Value: "FileType" },
            MaxSizeInKB: 32768,
            IsValidForCreate: false,
            IsValidForUpdate: false,
          }),
          column("statecode", "State", {
            OptionSet: {
              Name: "contoso_order_statecode",
              IsGlobal: false,
              Options: [
                { Value: 0, Label: label("Active") },
                { Value: 1, Label: label("Inactive") },
              ],
            },
          }),
          column("statuscode", "Status", {
            OptionSet: {
              Name: "contoso_order_statuscode",
              IsGlobal: false,
              Options: [
                { Value: 3, State: 1, Label: label("Cancelled") },
                { Value: 1, State: 0, Label: label("Open") },
                { Value: 2, State: 1, Label: label("Fulfilled") },
              ],
            },
          }),
        ],
      },
    ],
  },
};
