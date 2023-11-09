class AddCategoryIdExpenses < ActiveRecord::Migration[7.1]
  def up
    add_column :expenses, :category_id, :integer, null: false
    add_foreign_key :expenses, :categories
  end
  def down
  end
end
