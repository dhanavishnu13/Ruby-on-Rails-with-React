require 'rails_helper'

RSpec.describe ExpensesController, type: :controller do
    describe 'show' do
    it 'should the expense count' do
        get :index
        expect(response).to have_http_status(200)
    end
    end

    describe '#expense_params' do
      let(:params) do
        {
          expense: {
            payee_name: 'John Doe',
            description: 'Expense description',
            amount: 100.00,
            due_date: Date.today,
            categories_id: 1,
            user_id: 1
          }
        }
      end
  
      it 'permits trusted parameters' do
        post :create, params: params
        expect(controller.expense_params).to eq(params[:expense].slice(:payee_name, :description, :amount, :due_date, :categories_id, :user_id))
      end

end