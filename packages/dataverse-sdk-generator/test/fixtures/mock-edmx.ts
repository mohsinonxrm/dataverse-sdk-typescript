/**
 * Minimal EDMX metadata fixture for testing
 */
export const MOCK_EDMX = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="Microsoft.Dynamics.CRM" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityType Name="account">
        <Key>
          <PropertyRef Name="accountid" />
        </Key>
        <Property Name="accountid" Type="Edm.Guid" />
        <Property Name="name" Type="Edm.String" />
        <Property Name="revenue" Type="Edm.Decimal" />
        <Property Name="industrycode" Type="Edm.Int32" />
        <Property Name="statecode" Type="Edm.Int32" />
        <Property Name="telephone1" Type="Edm.String" />
        <Property Name="address1_city" Type="Edm.String" />
        <Property Name="createdon" Type="Edm.DateTimeOffset" />
        <Property Name="totalamount" Type="Edm.Decimal" />
        <Property Name="preferredcontactmethodcode" Type="Edm.Int32" />
        <NavigationProperty Name="primarycontactid" Type="Microsoft.Dynamics.CRM.contact" />
      </EntityType>

      <EntityType Name="contact">
        <Key>
          <PropertyRef Name="contactid" />
        </Key>
        <Property Name="contactid" Type="Edm.Guid" />
        <Property Name="fullname" Type="Edm.String" />
      </EntityType>

      <EntityType Name="incident">
        <Key>
          <PropertyRef Name="incidentid" />
        </Key>
        <Property Name="incidentid" Type="Edm.Guid" />
        <Property Name="title" Type="Edm.String" />
        <Property Name="customerid" Type="Edm.Guid" />
        <Property Name="ownerid" Type="Edm.Guid" />
        <NavigationProperty Name="customerid_account" Type="Microsoft.Dynamics.CRM.account" />
        <NavigationProperty Name="customerid_contact" Type="Microsoft.Dynamics.CRM.contact" />
        <NavigationProperty Name="ownerid_systemuser" Type="Microsoft.Dynamics.CRM.systemuser" />
      </EntityType>

      <EntityType Name="systemuser">
        <Key>
          <PropertyRef Name="systemuserid" />
        </Key>
        <Property Name="systemuserid" Type="Edm.Guid" />
        <Property Name="fullname" Type="Edm.String" />
      </EntityType>

      <EntityType Name="testentity">
        <Key>
          <PropertyRef Name="testentityid" />
        </Key>
        <Property Name="testentityid" Type="Edm.Guid" />
        <Property Name="class" Type="Edm.Guid" />
        <NavigationProperty Name="class_account" Type="Microsoft.Dynamics.CRM.account" />
      </EntityType>

      <EntityContainer Name="Container">
        <EntitySet Name="accounts" EntityType="Microsoft.Dynamics.CRM.account" />
        <EntitySet Name="contacts" EntityType="Microsoft.Dynamics.CRM.contact" />
        <EntitySet Name="incidents" EntityType="Microsoft.Dynamics.CRM.incident" />
        <EntitySet Name="systemusers" EntityType="Microsoft.Dynamics.CRM.systemuser" />
        <EntitySet Name="testentities" EntityType="Microsoft.Dynamics.CRM.testentity" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`;
