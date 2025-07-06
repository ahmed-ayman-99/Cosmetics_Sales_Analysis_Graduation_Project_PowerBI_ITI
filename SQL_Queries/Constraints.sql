-------------------------- NOT NULL columns --------------------------------------
ALTER TABLE [dbo].[Orders] ALTER COLUMN OrderDate DATETIME NOT NULL;
ALTER TABLE [dbo].[Customer] ALTER COLUMN FullName VARCHAR(100) NOT NULL;
ALTER TABLE [dbo].[Product] ALTER COLUMN ProductName VARCHAR(100) NOT NULL;
ALTER TABLE [dbo].[Status] ALTER COLUMN StatusType NVARCHAR(50) NOT NULL;
ALTER TABLE [dbo].[PaymentMethod] ALTER COLUMN PaymentType NVARCHAR(50) NOT NULL;
ALTER TABLE [dbo].[OrderItems] ALTER COLUMN Quantity INT NOT NULL;
ALTER TABLE [dbo].[OrderItems] ALTER COLUMN UnitPrice float NOT NULL;
ALTER TABLE [dbo].[Category] ALTER COLUMN CategoryName NVARCHAR(50) NOT NULL;

-------------------------- UNIQUE Constraints --------------------------------------

-- Category Name
ALTER TABLE [dbo].[Category] 
ADD CONSTRAINT UQ_Category_CategoryName UNIQUE (CategoryName);


-------------------------- CHECK Constraints --------------------------------------
-- Order date before ship date
ALTER TABLE [dbo].[Orders] 
ADD CONSTRAINT CK_Order_Date_Validation 
CHECK (OrderDate <= ShipDate OR ShipDate IS NULL);

-- Non-negative Freight
ALTER TABLE [dbo].[Orders] 
ADD CONSTRAINT CK_Order_Freight 
CHECK (Freight >= 0);

-- Non-negative SubTotal
ALTER TABLE [dbo].[Orders] 
ADD CONSTRAINT CK_Order_TotalSubTotal 
CHECK (TotalSubTotal >= 0);

-- Age validation (if applicable)

ALTER TABLE [dbo].[Customer] 
ADD CONSTRAINT CK_Customer_Age 
CHECK (Age >= 16);



-- Email must contain @ 

-- Product rating between 1-5
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT CK_Product_Rating 
CHECK (Rating BETWEEN 1 AND 5);


-- OrderItems quantity positive
ALTER TABLE [dbo].[OrderItems] 
ADD CONSTRAINT CK_OrderItems_Quantity 
CHECK (Quantity > 0);

-- OrderItems unit price non-negative
ALTER TABLE [dbo].[OrderItems] 
ADD CONSTRAINT CK_OrderItems_UnitPrice 
CHECK (UnitPrice >= 0);

-- LineTotal calculation 
ALTER TABLE OrderItems ADD CONSTRAINT CK_OrderItems_LineTotal
CHECK (ABS(LineTotal - (Quantity * UnitPrice)) < 0.01);


-------------------------- DEFAULT Values --------------------------------------
-- Default order date to current date/time
ALTER TABLE [dbo].[Orders] 
ADD CONSTRAINT DF_Orders_OrderDate 
DEFAULT GETDATE() FOR OrderDate;

-- Default status to 'Pending'
ALTER TABLE [dbo].[Status] 
ADD CONSTRAINT DF_Status_StatusType 
DEFAULT 'Pending' FOR StatusType;

-- Default product rating to 0
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT DF_Product_Rating 
DEFAULT 0 FOR Rating;

-- Default number of reviews to 0
ALTER TABLE [dbo].[Product] 
ADD CONSTRAINT DF_Product_NumberOfReviews 
DEFAULT 0 FOR NumberOfReviews;


-- Gender Validation
ALTER TABLE [dbo].[Customer]
ADD CONSTRAINT CK_Customer_Gender
CHECK (
    Gender IN ('Male', 'Female')
);


-- phone validation 
ALTER TABLE [dbo].[Customer]
ADD CONSTRAINT CK_Customer_Phone_Format
CHECK (
    PhoneNumber LIKE '+%' -- Starts with +
    AND LEN(PhoneNumber) BETWEEN 8 AND 15 -- Reasonable length
    AND PhoneNumber NOT LIKE '%[^0-9+]%' -- Only numbers and +
);


