json.extract! expense, :id, :payee_name, :description, :categories_id, :amount, :due_date, :created_at, :updated_at, :user_id
json.url expense_url(expense, format: :json)
