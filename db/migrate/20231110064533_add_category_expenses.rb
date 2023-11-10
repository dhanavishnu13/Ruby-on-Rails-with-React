class AddCategoryExpenses < ActiveRecord::Migration[7.1]
  def change
    add_reference :expenses, :categories, foreign_key: true
  end
end
