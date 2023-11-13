require 'rails_helper'

RSpec.describe ExpensesController, type: :request do

  # before(:all) do
  #   @expense1 = create(:expense)
  # end

  it 'creates a valid expense record' do
    user = User.create(email: 'vishnu@example.com', password: 'password123', password_confirmation: 'password123')
    expense = Expense.new(
      payee_name: 'Jio',
      categories_id: 2,
      description: 'Purchase of SIM card',
      amount: 100.00,
      user_id: 1,
      due_date: Date.today + 7.days,
      status: 'Pending'
    )
    expect(expense).to be_valid
  end

  # describe 'before_action :set_expense' do
  #   let(:expense) { create(:expense) } # Assuming you have a factory for Expense

  #   it 'sets the expense variable' do
  #     get :show, params: { id: expense.id }
  #     expect(assigns(@expense1)).to eq(expense)
  #   end
  # end

  # describe '#expense_params' do
  #   let(:params) do
  #     {
  #       expense: {
  #         payee_name: 'John Doe',
  #         description: 'Expense description',
  #         amount: 100.00,
  #         due_date: Date.today,
  #         categories_id: 1,
  #         user_id: 1
  #       }
  #     }
  #   end

  #   it 'permits trusted parameters' do
  #     post :create, params: params
  #     expect(controller.expense_params).to eq(params[:expense].slice(:payee_name, :description, :amount, :due_date, :categories_id, :user_id))
  #   end
  # end
end
