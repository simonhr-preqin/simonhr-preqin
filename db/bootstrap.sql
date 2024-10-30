create database investors collate SQL_Latin1_General_CP1_CI_AS
go

use investors
go

grant connect on database :: investors to dbo
go

grant view any column encryption key definition, view any column master key definition on database :: investors to [public]
go

create table dbo.data
(
    name nvarchar(100) not null,
    type nvarchar(50) not null,
    country nvarchar(30) not null,
    date_added date not null,
    last_updated date not null,
    asset_class nvarchar(30) not null,
    amount money not null,
    currency char(3) not null
)
go

-- TODO: Import data from CSV into data table

select distinct identity(int, 1, 1) as id, name, type, country, date_added, last_updated
into investors
from data;
GO

select identity(int, 1, 1) as id, id as investor_id, asset_class, amount, currency
into commitments
from data d join investors i on d.name = i.name;
GO

create view commitments_total
with
    schemabinding
as
    select c.investor_id, sum(amount) as total_amount, count_big(*) as count
    from dbo.commitments c
    group by c.investor_id
go

create unique clustered index commitments_total_investor_id_index
    on dbo.commitments_total (investor_id)
go

create unique index commitments_total_investor_id_amount_index
    on dbo.commitments_total (investor_id) include (total_amount)
go
