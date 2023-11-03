json.extract! expense, :id, :payee_name, :description, :amount, :due_date, :created_at, :updated_at
json.url expense_url(expense, format: :json)
