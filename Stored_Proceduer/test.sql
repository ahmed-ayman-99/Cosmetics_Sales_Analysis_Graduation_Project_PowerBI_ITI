InsSubCategory 1,"Beauty Blender"
UpSubCategory 26,1,"Brush"
GetAllSubCategory 26
DelSubCategory 25
---------------------------------------------------
InsBranch PS
UpBranch 6,Alooly
DelBranch 6
GetAllBranch 5
---------------------------------------------------
InsSalesPersons "Ahmed","Ayman",45000,30000,"5-7-2022",2
UpSalesPerson 32, 50000
UpSalesPerson 32, 20000
DelSalesPerson 32 
GetAllSalesPerson 31
------------------------------------------------
InsCustomers "Ahmed", "Gomaa","male",01080200208,"Egypt",27,"Ahmed Gomaa","ahmedgomaa@gmail.com" 
select * from customer where CustomerID = 3540
UpCustomers 3540, "ahmed@gmail.com"
DelCustomers 3540
-------------------------------------------------
InsOrders 
5000,
31,
3539,
"5-5-2022",
1,
1500

select * from orders where totaldue = 1500

UpOrders 
5000,
3000

DelOrders 5000
----------------------------------------------------
