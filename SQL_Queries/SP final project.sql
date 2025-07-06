Create procedure InsProduct 
@ProductID int,
@ProductName Varchar(50),
@Brand Varchar(50),
@SkinType Varchar(50),
@GenderTarget Varchar(50),
@SubCategoryID int
As 
Begin 
 insert into Product(ProductID,ProductName,Brand,SkinType,GenderTarget,SubCategoryID)
 Values(@ProductID,@ProductName,@Brand,@SkinType,@GenderTarget,@SubCategoryID)
End
-----------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE UpProduct 
    @ProductID INT,
    @NewRating FLOAT
AS 
BEGIN 
    UPDATE Product
    SET Rating = @NewRating
    WHERE ProductID = @ProductID
END
-------------------------------------------------------------------------------------------------------------------------
Create Procedure DelProduct 
@ProductID int
AS 
Begin 
 Delete from Products 
 Where ProductID = @ProductID
End
-------------------------------------------------------------------------------------------------------------------------
Create Procedure GetAllProducts 
    @ProductID int = NULL  
AS
BEGIN
    IF @ProductID IS NULL
        SELECT * FROM Products
    ELSE
        SELECT * FROM Products WHERE ProductID = @ProductID
END
=========================================================================================================================
Create Procedure InsOrders 
@OrderID varchar(50),
@SalesPersonID int,
@CustomerID int,
@OrderDate Date,
@PaymentMethodID int,
@TotalDue float
AS 
IF NOT EXISTS  (select OrderID from Orders where OrderID=@OrderID)
 Insert into Orders(OrderID,SalesPersonID,CustomerID,OrderDate,PaymentMethodID,TotalDue)
 Values(@OrderID,@SalesPersonID,@CustomerID,@OrderDate,@PaymentMethodID,@TotalDue)
Else
 Select 'Duplicate Data'
---------------------------------------------------------------------------------------------------------------------
Create Procedure UpOrders 
@OrderID varchar(50),
@NewTotalDue float
As 
Begin 
 Update Orders
 Set TotalDue=@NewTotalDue
 Where OrderID=@OrderID
End
-----------------------------------------------------------------------------------------------------------------------
Create Procedure DelOrders
    @OrderID varchar(50)
AS
Begin
    Delete from Orders where OrderID = @OrderID
End
------------------------------------------------------------------------------------------------------------------------
Create Procedure GetAllOrders
AS
Begin
    Select * from Orders
End
==========================================================================================================================
Create Procedure InsCustomers
    @CustomerID int,
    @FirstName varchar(30),
    @LastName varchar(30),
    @Gender varchar(10),
    @PhoneNumber bigint,
    @Address varchar(100),
    @Age int,
    @Email varchar(200)
AS
Begin
    Insert into Customer (CustomerID,FirstName, LastName, Gender, PhoneNumber, Address, Age, Email)
    values (@CustomerID,@FirstName, @LastName, @Gender, @PhoneNumber, @Address, @Age, @Email)
End
-------------------------------------------------------------------------------------------------------------------------
Create Procedure UpCustomers
    @CustomerID int,
    @NewEmail varchar(200)
AS
Begin
    if NOT EXISTS (select * from Customer where CustomerID = @CustomerID)
    Begin
        Print 'Customer not found.'
        Return
    End
    Declare @CurrentEmail Nvarchar(100);
    Select @CurrentEmail = Email from Customer where CustomerID = @CustomerID;

    if @CurrentEmail = @NewEmail
    Begin
        Print 'No change in email address.'
    End
    Else
    Begin
        Update Customer
        Set Email = @NewEmail
        Where CustomerID = @CustomerID
        Print 'Email updated successfully.'
    End
End
-----------------------------------------------------------------------------------------------------------
Create Procedure DelCustomers
   @CustomerID int
AS
Begin
    Declare @Age int
    Select @Age = Age from Customer Where CustomerID = @CustomerID

    IF @Age < 18
        Print 'underage or age not recorded.'
    else
    Begin
        Delete From Customer Where CustomerID = @CustomerID
        Print 'Customer deleted successfully.'
    End
End
-----------------------------------------------------------------------------------------------------------------------
Create Procedure GetAllCustomers
    @CustomerID INT = NULL  
AS
BEGIN
    IF @CustomerID IS NULL
        SELECT * FROM Customer
    ELSE
        SELECT * FROM Customer WHERE CustomerID = @CustomerID
END
=====================================================================================================================
Create Procedure InsSalesPersons
    @FirstName varchar(50),
    @LastName varchar(50),
    @SalesQuota int,
    @SalesLastYear int,
    @HiringDate date,
    @BranchID int
AS
Begin
    Insert into SalesPerson (FirstName, LastName, SalesQuota, [SalesLastYear(2022)], HiringDate, BranchID)
    Values (@FirstName, @LastName, @SalesQuota, @SalesLastYear, @HiringDate, @BranchID)
End
----------------------------------------------------------------------------------------------------------------------
Create Procedure UpSalesPerson
    @SalesPersonID int,
    @NewQuota int
AS
Begin
    Declare @CurrentQuota int
    Select @CurrentQuota = SalesQuota From SalesPerson Where SalesPersonID = @SalesPersonID

    if @NewQuota <= @CurrentQuota
        print 'New quota must be higher than the current quota.'
    else
    Begin
        Update SalesPerson
        set SalesQuota = @NewQuota
        Where SalesPersonID = @SalesPersonID

        Print 'Sales quota updated successfully.'
    End
End
-----------------------------------------------------------------------------------------------------------------------
Create Procedure DelSalesPerson
    @SalesPersonID int
AS
Begin
    Declare @HiringDate Date
    Select @HiringDate = HiringDate from SalesPerson where SalesPersonID = @SalesPersonID

    IF @HiringDate IS NULL
        Print 'Sales person not found.'
    else if DATEDIFF(DAY, @HiringDate, GETDATE()) < 365
        Print 'Cannot delete. Employee must be hired more than 1 year ago.'
    else
    Begin
        Delete From SalesPerson where SalesPersonID = @SalesPersonID
        Print 'Sales person deleted successfully.'
    End
End
-----------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE GetAllSalesPerson
    @SalesPersonID Int = NULL  
AS
BEGIN
    IF @SalesPersonID IS NULL
        SELECT * FROM SalesPerson
    ELSE
        SELECT * FROM SalesPerson WHERE SalesPersonID = @SalesPersonID
END
========================================================================================================================
CREATE PROCEDURE InsBranch
    @BranchID INT,
    @Location NVARCHAR(200)
AS
BEGIN
    INSERT INTO Branch (BranchID, Location)
    VALUES (@BranchID, @Location)
END
------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE UpBranch
    @BranchID INT,
    @NewLocation NVARCHAR(200)
AS
BEGIN
    UPDATE Branch
    SET Location = @NewLocation
    WHERE BranchID = @BranchID
END
---------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE DelBranch
    @BranchID INT
AS
BEGIN
    DELETE FROM Branch
    WHERE BranchID = @BranchID
END
-----------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE GetAllBranch
    @BranchID INT = NULL  
AS
BEGIN
    IF @BranchID IS NULL
        SELECT * FROM Branch
    ELSE
        SELECT * FROM Branch WHERE BranchID = @BranchID
END
===============================================================================================================================
CREATE PROCEDURE InsSubCategory
    @SubCategoryID INT,
    @CategoryID INT,
    @SubCategoryName NVARCHAR(200)
AS
BEGIN
    INSERT INTO SubCategory (SubCategoryID, CategoryID, SubCategoryName)
    VALUES (@SubCategoryID, @CategoryID, @SubCategoryName)
END
--------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE UpSubCategory
    @SubCategoryID INT,
    @NewCategoryID INT,
    @NewSubCategoryName NVARCHAR(200)
AS
BEGIN
    UPDATE SubCategory
    SET CategoryID = @NewCategoryID,
        SubCategoryName = @NewSubCategoryName
    WHERE SubCategoryID = @SubCategoryID
END
----------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE DelSubCategory
    @SubCategoryID INT
AS
BEGIN
    DELETE FROM SubCategory
    WHERE SubCategoryID = @SubCategoryID
END
-----------------------------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE GetAllSubCategory
    @SubCategoryID INT = NULL  
AS
BEGIN
    IF @SubCategoryID IS NULL
        SELECT * FROM SubCategory
    ELSE
        SELECT * FROM SubCategory WHERE SubCategoryID = @SubCategoryID
END
====================================================================================================================================




