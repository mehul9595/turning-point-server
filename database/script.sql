create schema [AIA];
go

create user [FuncApp] with password = 'password'
go

grant execute on schema::[AIA] to [FuncApp]
go

create sequence dbo.[global_sequence]
as int
start with 1
increment by 1;
go

drop table if exists dbo.registrations;
go

create table dbo.registrations
(
	id int not null primary key default (next value for [global_sequence]),
    firstName nvarchar(50) not null,
    lastName narvarchar(50) not null,
    email nvarchar(100) not null
)
go

insert into dbo.[registrations] (firstName, lastName, email) 
values ('mehul', 'makwana', 'mehul9595@gmail.com')
go

/*
	POST
	Accepted Input: 
	
*/
create or alter procedure [AIA].[post_registrations]
@payload nvarchar(max)
as
if (isjson(@payload) != 1) begin
	throw 50000, 'Payload is not a valid JSON document', 16;
end

declare @ids table (id int not null);

insert into dbo.registrations ([firstName], [lastName], [email])
output inserted.id into @ids
select [firstName], [lastName], [email] from openjson(@payload) with
(
	 firstName nvarchar(50),
    lastName narvarchar(50),
    email nvarchar(100)
)

declare @newPayload as nvarchar(max) = (select id from @ids for json auto);
exec "select * from dbo.registrations where id = "+ @newPayload
go
