class RemoveCategoryExpenses < ActiveRecord::Migration[7.1]
  def change
    remove_columns :expenses, :category, :category_id
  end
end
