class AddCatIdToExpense < ActiveRecord::Migration[7.1]
  def up
    add_column :expenses, :categoryId, :integer
  end
end
