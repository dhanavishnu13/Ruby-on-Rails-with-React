class AddUserToExpense < ActiveRecord::Migration[7.1]
  def up
    add_reference :expenses, :users, foreign_key: true
  end
end
