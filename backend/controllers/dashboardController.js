const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(userId);

    // 1. Total Income & Expenses via aggregation
    const incomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const expenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;
    const totalBalance = totalIncome - totalExpense;

    // 2. Last 60 days Income & last 30 days Expense totals & lists
    const since60 = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: since60 },
    }).sort({ date: -1 });

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: since30 },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    // 3. Fetch recent Income and Expense, tag type, merge & sort & limit 5
    const recentIncome = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);
    const recentExpense = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const merged = [
      ...recentIncome.map(tx => ({ ...tx.toObject(), type: "income" })),
      ...recentExpense.map(tx => ({ ...tx.toObject(), type: "expense" })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    // Final response
    res.json({
      totalBalance,
      totalIncome,
      totalExpense,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: merged,
    });
  } catch (error) {
    console.error("getDashboardData error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
