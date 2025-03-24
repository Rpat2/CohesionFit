-- SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.phone, Memberships.tier
-- FROM Customers
-- INNER JOIN Memberships
-- ON Customers.memID = Memberships.memID
-- ORDER BY Customers.customerID;


-- UPDATE Customers
-- SET Customers.firstName = %s, Customers.lastName = %s, Customers.email = %s, Customers.phone=%s, Customers.memID=NULL
-- WHERE customerID = %s



SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.phone, Memberships.tier
FROM Customers
INNER JOIN Memberships 
ON Customers.memID = Memberships.memID 
WHERE customerID = ?;


SELECT * FROM Customers WHERE customerID = 2;