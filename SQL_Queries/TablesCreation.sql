Create Table Branch (BranchID int , Location varchar(20))

Create Table Customer (CustomerID int, FirstName varchar(20),LastName varchar(20),
						Gender varchar(10),PhoneNumber int, Address varchar(20),
						Age int, Email varchar(20))

Create Table PaymentMethod (PaymentMethodID int, PaymentType varchar(10))

Create Table SalesPerson (SalesPersonID int, FirstName varchar(20),LastName varchar(20),
							SalesQuota int, SalesLastYear int,HiringDate date,BranchID int)

Create Table ShipmentMethod (ShipMethodID int, ShipmentType varchar(20))

Create Table Status (StatusID int, StatusType varchar(15),OrderID varchar(20))

Create Table Products (ProdcutID int, ProductName varchar (20),Brand varchar(50),
						CategoryID int, SubCategoryID int,UsageFrequency varchar(30),
						UnitePrice Float, Rating Float,NumberOfReviews int,ProductSize varchar(10),
						SkinType varchar (15),GenderTarget varchar(10),PackagingType varchar(20),
						MainIngredient varchar(30),CrueltyFree bit,CountryOfOrigin varchar(20))

Create Table Orders (OrderID varchar(20), SalesPersonID int, CustomerID int, OrderDate date,ShipDate date,
					ShippingMethod varchar(20),ShipMethodID int, PaymentMethodID int, Freight int,
					TotalSubTotal float, TotalTaxPEROrder float, TotalDue float)

Create Table OrderItems (OrderID varchar(20), ProductID int, Quantity int, UnitPrice float,
						 LineTotal float, Tax float)

Create Table Category (CategoryID int, CategoryName varchar(25))

Create Table SubCategory (SubCategoryID int,CategoryID int, SubCategoryName varchar(25))

