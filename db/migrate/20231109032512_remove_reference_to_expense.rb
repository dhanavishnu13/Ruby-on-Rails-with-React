class RemoveReferenceToExpense < ActiveRecord::Migration[7.1]
  def change
    remove_reference :expenses, :categories
  end
end
