import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billAmount, setBillAmount] = useState("");
  const [expenseByUser, setExpenseByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const expenseByFriend = billAmount ? billAmount - expenseByUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!billAmount || !expenseByUser) return;
    onSplitBill(whoIsPaying === "user" ? expenseByFriend : -expenseByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <label>💰Bill Amount</label>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
      />

      <label>🕴️ Your expense</label>
      <input
        type="text"
        value={expenseByUser}
        onChange={(e) =>
          setExpenseByUser(
            Number(e.target.value) > billAmount
              ? expenseByUser
              : Number(e.target.value)
          )
        }
      />

      <label>👬{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={expenseByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <input type="text" disabled />

      <Button>Split Bill </Button>
    </form>
  );
}
