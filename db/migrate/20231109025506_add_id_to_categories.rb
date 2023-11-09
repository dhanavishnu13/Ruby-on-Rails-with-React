class AddIdToCategories < ActiveRecord::Migration[7.1]
  def change
    add_column :categories, :categoryId, :integer, null: false
  end
end
