import React from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectExpenses } from "./expenseSlice";
import { Table } from 'react-bootstrap';


const categoryMapping: { [key: number]: string } = {
  1: "Food",
  2: "Transportation",
  3: "Entertainment",
  4: "Rent",
  5: "Other",
};

function getCategoryName(categoryId: string): string {
  return categoryMapping[categoryId] || "Unknown Category";
}

function Dashboard(user: any) {
    const expenses = useAppSelector(selectExpenses);

    const user_id = [];

    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            user_id.push(user[key]);
        }
    }

    // Create a dictionary to store summarized amounts for each category
    const categorySummary: { [key: string]: number } = {};

    // Summarize expenses based on categories
    expenses
        .filter(expense => expense.user_id === user_id[1])
        .forEach(expense => {
            const category = getCategoryName(expense.categories_id);
            const amount = parseFloat(expense.amount);

            if (category in categorySummary) {
                categorySummary[category] += amount;
            } else {
                categorySummary[category] = amount;
            }
        });

    return (
        <div>
            <h2>Dashboard</h2>
            {user_id[1]}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display summarized data */}
                    {Object.keys(categorySummary).map(category => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>{categorySummary[category]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;
