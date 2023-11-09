class RemoveCatIdToExpense < ActiveRecord::Migration[7.1]
  def up
    remove_column :expenses, :categoryId
  end
end
