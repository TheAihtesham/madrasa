import Expense from "../models/expense.js";
import Fee from "../models/fee.js";
import Donation from "../models/donation.js";

// Get all expenses + total balance
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    const fees = await Fee.find({ status: "Paid" });
    const donations = await Donation.find({ status: "Confirmed" });

    const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    const totalFunds = totalFees + totalDonations;
    const remainingBalance = totalFunds - totalExpense;

    res.json({ expenses, totalFunds, totalExpense, remainingBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Expense
export const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
