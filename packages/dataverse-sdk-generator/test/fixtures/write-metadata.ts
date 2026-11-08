/**
 * A fixture for the create and update types (#347): columns that are writable on create and
 * update, on one of them only, or never (`IsValidForCreate` / `IsValidForUpdate` as
 * RetrieveMetadataChanges returns them), a lookup whose navigation property has its name, a custom
 * lookup whose navigation property is named after its schema name (`contoso_ParentAccountId`), a
 * polymorphic lookup (`parentcustomerid`) and an owner lookup (`ownerid`).
 */
import type { RetrieveMetadataChangesResponse } from "../../src/metadata-service.js";
import type { AttributeMetadataDetail } from "../../src/metadata-service.js";

export const WRITE_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="crmbaseentity" Abstract="true" />
      <EntityType Name="principal" BaseType="mscrm.crmbaseentity" Abstract="true" />
      <EntityType Name="account" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="accountid" /></Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" Unicode="false" />
        <Property Name="description" Type="Edm.String" Unicode="false" />
        <Property Name="creditlimit" Type="Edm.Decimal" Scale="Variable" />
        <Property Name="numberofemployees" Type="Edm.Int32" />
        <Property Name="industrycode" Type="Edm.Int32" />
        <Property Name="statecode" Type="Edm.Int32" />
        <Property Name="createdon" Type="Edm.DateTimeOffset" />
        <Property Name="importsequencenumber" Type="Edm.Int32" />
        <Property Name="versionnumber" Type="Edm.Int64" />
        <Property Name="_primarycontactid_value" Type="Edm.Guid" />
        <Property Name="_contoso_parentaccountid_value" Type="Edm.Guid" />
        <Property Name="_ownerid_value" Type="Edm.Guid" />
        <Property Name="_createdby_value" Type="Edm.Guid" />
        <NavigationProperty Name="primarycontactid" Type="mscrm.contact" Nullable="false" Partner="account_primary_contact">
          <ReferentialConstraint Property="_primarycontactid_value" ReferencedProperty="contactid" />
        </NavigationProperty>
        <NavigationProperty Name="contoso_ParentAccountId" Type="mscrm.account" Nullable="false" Partner="contoso_account_parent">
          <ReferentialConstraint Property="_contoso_parentaccountid_value" ReferencedProperty="accountid" />
        </NavigationProperty>
        <NavigationProperty Name="ownerid" Type="mscrm.principal" Nullable="false" Partner="owner_accounts">
          <ReferentialConstraint Property="_ownerid_value" ReferencedProperty="ownerid" />
        </NavigationProperty>
        <NavigationProperty Name="createdby" Type="mscrm.systemuser" Nullable="false" Partner="lk_accountbase_createdby">
          <ReferentialConstraint Property="_createdby_value" ReferencedProperty="systemuserid" />
        </NavigationProperty>
        <NavigationProperty Name="contact_customer_accounts" Type="Collection(mscrm.contact)" Partner="parentcustomerid_account" />
      </EntityType>
      <EntityType Name="contact" BaseType="mscrm.crmbaseentity">
        <Key><PropertyRef Name="contactid" /></Key>
        <Property Name="contactid" Type="Edm.Guid" />
        <Property Name="firstname" Type="Edm.String" Unicode="false" />
        <Property Name="lastname" Type="Edm.String" Unicode="false" />
        <Property Name="fullname" Type="Edm.String" Unicode="false" />
        <Property Name="_parentcustomerid_value" Type="Edm.Guid" />
        <NavigationProperty Name="parentcustomerid_account" Type="mscrm.account" Nullable="false" Partner="contact_customer_accounts">
          <ReferentialConstraint Property="_parentcustomerid_value" ReferencedProperty="accountid" />
        </NavigationProperty>
        <NavigationProperty Name="parentcustomerid_contact" Type="mscrm.contact" Nullable="false" Partner="contact_customer_contacts">
          <ReferentialConstraint Property="_parentcustomerid_value" ReferencedProperty="contactid" />
        </NavigationProperty>
      </EntityType>
      <EntityType Name="systemuser" BaseType="mscrm.principal">
        <Key><PropertyRef Name="systemuserid" /></Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
      </EntityType>
      <EntityContainer Name="System">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="contacts" EntityType="Microsoft.Dynamics.CRM.contact" />
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;

const label = (text: string) => ({ UserLocalizedLabel: { Label: text, LanguageCode: 1033 } });

/** A column: valid for create and update unless `create` / `update` say otherwise. */
function column(
  logicalName: string,
  schemaName: string,
  attributeType: string,
  extra: Partial<AttributeMetadataDetail> & { create?: boolean; update?: boolean } = {}
): AttributeMetadataDetail {
  const { create = true, update = true, ...rest } = extra;
  return {
    LogicalName: logicalName,
    SchemaName: schemaName,
    AttributeType: attributeType,
    IsValidForRead: true,
    IsValidForCreate: create,
    IsValidForUpdate: update,
    ...rest,
  };
}

export const WRITE_ENTITY_METADATA: Record<string, RetrieveMetadataChangesResponse> = {
  account: {
    EntityMetadata: [
      {
        LogicalName: "account",
        SchemaName: "Account",
        EntitySetName: "accounts",
        PrimaryIdAttribute: "accountid",
        PrimaryNameAttribute: "name",
        Keys: [],
        Attributes: [
          // The primary key can be set on create, never changed
          column("accountid", "AccountId", "Uniqueidentifier", {
            update: false,
            RequiredLevel: { Value: "SystemRequired" },
          }),
          column("name", "Name", "String", {
            RequiredLevel: { Value: "ApplicationRequired" },
            DisplayName: label("Account Name"),
            MaxLength: 160,
          }),
          column("description", "Description", "Memo", { MaxLength: 2000 }),
          column("creditlimit", "CreditLimit", "Money"),
          column("numberofemployees", "NumberOfEmployees", "Integer"),
          column("industrycode", "IndustryCode", "Picklist", {
            OptionSet: {
              Name: "account_industrycode",
              IsGlobal: false,
              Options: [
                { Value: 1, Label: label("Accounting") },
                { Value: 2, Label: label("Agriculture") },
              ],
            },
          }),
          // Set with SetState / an update, not on create
          column("statecode", "StateCode", "State", {
            create: false,
            OptionSet: {
              Name: "account_statecode",
              IsGlobal: false,
              Options: [
                { Value: 0, Label: label("Active") },
                { Value: 1, Label: label("Inactive") },
              ],
            },
          }),
          column("createdon", "CreatedOn", "DateTime", { create: false, update: false }),
          // Set on create only (a data import's sequence number)
          column("importsequencenumber", "ImportSequenceNumber", "Integer", { update: false }),
          column("versionnumber", "VersionNumber", "BigInt", { create: false, update: false }),
          column("primarycontactid", "PrimaryContactId", "Lookup", { Targets: ["contact"] }),
          // The "name" column of a lookup: read-only, beside the lookup
          column("primarycontactidname", "PrimaryContactIdName", "String", {
            create: false,
            update: false,
            AttributeOf: "primarycontactid",
          }),
          column("contoso_parentaccountid", "contoso_ParentAccountId", "Lookup", {
            Targets: ["account"],
          }),
          column("ownerid", "OwnerId", "Owner", { Targets: ["systemuser", "team"] }),
          column("createdby", "CreatedBy", "Lookup", {
            create: false,
            update: false,
            Targets: ["systemuser"],
          }),
        ],
      },
    ],
  },
  contact: {
    EntityMetadata: [
      {
        LogicalName: "contact",
        SchemaName: "Contact",
        EntitySetName: "contacts",
        PrimaryIdAttribute: "contactid",
        PrimaryNameAttribute: "fullname",
        Keys: [],
        Attributes: [
          column("contactid", "ContactId", "Uniqueidentifier", { update: false }),
          column("firstname", "FirstName", "String", { MaxLength: 50 }),
          column("lastname", "LastName", "String", {
            MaxLength: 50,
            RequiredLevel: { Value: "ApplicationRequired" },
          }),
          // Calculated from first and last name
          column("fullname", "FullName", "String", { create: false, update: false }),
          column("parentcustomerid", "ParentCustomerId", "Customer", {
            Targets: ["account", "contact"],
          }),
        ],
      },
    ],
  },
  systemuser: {
    EntityMetadata: [
      {
        LogicalName: "systemuser",
        SchemaName: "SystemUser",
        EntitySetName: "systemusers",
        PrimaryIdAttribute: "systemuserid",
        Keys: [],
        Attributes: [column("systemuserid", "SystemUserId", "Uniqueidentifier", { update: false })],
      },
    ],
  },
};
