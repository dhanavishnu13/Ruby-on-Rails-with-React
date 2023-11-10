import React from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectExpenses } from "./expenseSlice";
import { Table } from 'react-bootstrap';

// Assuming you have a mapping of category IDs to names
const categoryMapping: { [key: number]: string } = {
  1: "Food",
  2: "Transportation",
  3: "Entertainment",
  4: "Rent",
  5: "Other",
  // Add more entries as needed
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Payee</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display individual expenses */}
                    {expenses
                        .filter(expense => expense.user_id === user_id[1])
                        .map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.payee_name}</td>
                                <td>{expense.description}</td>
                                <td>{getCategoryName(expense.categories_id)}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.due_date}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;
