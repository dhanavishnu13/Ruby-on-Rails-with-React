class AddCatidToExpense < ActiveRecord::Migration[7.1]
  def up
    add_reference :expenses, :categories, index: true
  end
end
