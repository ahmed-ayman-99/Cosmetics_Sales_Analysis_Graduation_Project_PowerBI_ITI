Select distinct Count(orderID)  as [Number Of Orders]
From Orders

Select COUNT(CustomerID) as [Number Of Customers]
From DimCustomer

Select SUM(TotalDue) as [Total Due]
From Orders

Select SUM(Quantity) as [Number of Sold Quantity]
From FactSales

Select Count(BranchID) as [Number of Branches]
From Branch

Select COUNT(SalesPersonID) as [Number of Sales Person]
From DimSalesPerson

Select SUM([TotalTax Order]) as [Total Tax]
From Orders

Select SUM(freight) as [Total Freight]
From Orders

Select SUM(lineTotal) as [Total Subtotal]
From FactSales

Select SUM(TotalDue) / COUNT(OrderID) as [Average Order Value]
From Orders

Select COUNT(SubCategoryID) as [Number of Subcategories]
From DimSubCategory

Select COUNT(SubCategoryID) as [Number of Makeup Subcategories]
From DimSubCategory
Where CategoryID = 1

Select COUNT(SubCategoryID) as [Number of Skincare Subcategories]
From DimSubCategory
Where CategoryID = 2

Select C.CategoryName, COUNT(Distinct FS.OrderID) as NumberOfOrders
From FactSales FS
Join DimProduct DP ON FS.ProductID = DP.ProductID
Join DimSubCategory DSC ON DP.SubCategoryID = DSC.SubCategoryID
Join DimCategory C ON DSC.CategoryID = C.CategoryID
Group By C.CategoryName

Select SkinType, Count(ProductID) as [Number Of Products]
From DimProduct
Group By SkinType

Select count(Distinct ProductID) as [Number Of sold Products]
From OrderItems

Select AVG(Rating) as [Average Products Rating]
From Product

Select AVG(Age) as [Average Customers Age]
From Customer

Select Sum(SalesQuota) as [Sales Target]
From DimSalesPerson

Select COUNT(Distinct brand) as [Number Of Brands]
From Product