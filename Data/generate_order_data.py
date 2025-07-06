import pandas as pd
import numpy as np
from datetime import datetime, timedelta



customers_df = pd.read_excel('D:\ITI PowerBI Development\ITI Course Materials\GraduationProject\Data\Customer.xlsx')
products_df = pd.read_csv('D:\ITI PowerBI Development\ITI Course Materials\GraduationProject\Data\Cosmetics1.csv')

print("--- Dummy Data Generated ---")
print(f"Number of Dummy Customers: {len(customers_df)}")
print(f"Number of Dummy Products: {len(products_df)}")
print("---------------------------\n")


NUM_ORDERS = 15000 # Set to 15,000 as requested
START_DATE = datetime(2023, 1, 1)
END_DATE = datetime(2024, 12, 31)
DATE_RANGE_DAYS = (END_DATE - START_DATE).days

TAX_RATE = 0.07 # 7% tax
FREIGHT_COSTS = {
    'Pickup': 0.0,
    'Standard Shipping': 5.0,
    'Express Shipping': 15.0
}
SHIPPING_METHODS = list(FREIGHT_COSTS.keys())
SHIPPING_METHOD_PROBABILITIES = [0.15, 0.70, 0.15] 

# --- 2. Generate Orders ---
all_orders_data = []
all_order_items_data = []
order_item_id_counter = 1 

print(f"Generating {NUM_ORDERS} orders and their items...\n")

for i in range(NUM_ORDERS):
    order_id = f'ORD-{i+1:07d}'

    # Random Customer
    customer = customers_df.sample(1).iloc[0]
    customer_id = customer['CustomerID']

    # Order Date
    random_days_offset = np.random.randint(0, DATE_RANGE_DAYS + 1)
    order_date = START_DATE + timedelta(days=random_days_offset)

    # Shipping Method and Ship Date
    shipping_method = np.random.choice(SHIPPING_METHODS, p=SHIPPING_METHOD_PROBABILITIES)
    freight = FREIGHT_COSTS[shipping_method]

    if shipping_method == 'Pickup':
        ship_date = order_date
    else:
        ship_delay_days = np.random.randint(3, 8) 
        ship_date = order_date + timedelta(days=ship_delay_days)

    # Number of products in this order
    num_products_in_order = np.random.randint(1, 6) 


    products_for_this_order = products_df.sample(min(num_products_in_order, len(products_df)), replace=False)

    total_order_linetotal = 0
    total_order_tax = 0


    if not products_for_this_order.empty:
        for _, product in products_for_this_order.iterrows():
            quantity = np.random.randint(1, 4) # 1 to 3 units of each product
            unit_price = product['UnitPrice'] # Use the actual unit price from the product table
            linetotal = round(quantity * unit_price, 2)
            tax = round(linetotal * TAX_RATE, 2)

            all_order_items_data.append({
                'orderItemID': f'ITEM-{order_item_id_counter:09d}',
                'orderID': order_id,
                'ProductID': product['ProductID'],
                'Quantity': quantity,
                'unit price': unit_price,
                'linetotal': linetotal,
                'tax': tax
            })
            order_item_id_counter += 1

            total_order_linetotal += linetotal
            total_order_tax += tax
    else:
      
        pass 

    total_order_amount = round(total_order_linetotal + total_order_tax + freight, 2)

    all_orders_data.append({
        'orderID': order_id,
        'CustomerID': customer_id,
        'OrderDate': order_date.strftime('%Y-%m-%d %H:%M:%S'),
        'shipDate': ship_date.strftime('%Y-%m-%d %H:%M:%S'),
        'shipping_method': shipping_method,
        'freight': round(freight, 2),
        'total_linetotal_sum': round(total_order_linetotal, 2),
        'total_tax_sum': round(total_order_tax, 2),
        'total_amount': total_order_amount
    })

# Create DataFrames
orders_df = pd.DataFrame(all_orders_data)
order_items_df = pd.DataFrame(all_order_items_data)

# --- 3. Final Output and Saving ---
print("Generation complete.\n")

print("Orders DataFrame Head:")
print(orders_df.head())
print(f"\nTotal Orders Generated: {len(orders_df)}")

print("\nOrder Items DataFrame Head:")
print(order_items_df.head())
print(f"\nTotal Order Items Generated: {len(order_items_df)}")


# Save to CSV files
orders_df.to_csv('orders.csv', index=False)
order_items_df.to_csv('order_items.csv', index=False)

print("\n--- CSV Files Generated ---")
print("Order data saved to 'orders.csv'")
print("Order item data saved to 'order_items.csv'")
print("---------------------------\n")