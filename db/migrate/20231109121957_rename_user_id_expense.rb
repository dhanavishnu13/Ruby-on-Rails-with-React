class RenameUserIdExpense < ActiveRecord::Migration[7.1]
  def change
    rename_column :expenses, :users_id, :user_id
  end
end
