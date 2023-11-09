class RemoveCategoryIdExpense < ActiveRecord::Migration[7.1]
  def up
    remove_column :expenses, :categories_id
  end
  def down
  end
end
