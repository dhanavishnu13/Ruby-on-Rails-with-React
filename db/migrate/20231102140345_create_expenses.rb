class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses do |t|
      t.string :payee_name, null: false
      t.string :description
      t.string :category
      t.decimal :amount, null: false
      t.date :due_date, null: false
      t.string :status

      t.timestamps
    end
  end
end
