import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

import {
  getTransactions,
  deleteTransaction,
} from "../services/transactionService";

const Transactions = () => {
  const [transactions, setTransactions] =
    useState([]);

  const [
    editingTransaction,
    setEditingTransaction,
  ] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data =
        await getTransactions();

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteTransaction(id);

      fetchTransactions();

      if (
        editingTransaction?._id ===
        id
      ) {
        setEditingTransaction(
          null
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>

      {/* Header */}

      <section className="mb-12 max-w-6xl mx-auto text-center space-y-6">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Transactions
        </p>

        <h1 className="text-4xl font-semibold">
          Money Flow
        </h1>

        <p className="text-lg text-slate-400 mx-auto max-w-2xl">
          Record every income and expense in one simple place.
        </p>

      </section>

      {/* Form */}

      <div className="max-w-2xl mx-auto">

        <TransactionForm
          refresh={
            fetchTransactions
          }
          editData={
            editingTransaction
          }
          clearEdit={() =>
            setEditingTransaction(
              null
            )
          }
        />

      </div>

      {/* Transactions List */}

      <section className="mt-12 max-w-6xl mx-auto">

        <TransactionTable
          transactions={
            transactions
          }
          onDelete={
            handleDelete
          }
          onEdit={
            setEditingTransaction
          }
        />

      </section>

    </MainLayout>
  );
};

export default Transactions;