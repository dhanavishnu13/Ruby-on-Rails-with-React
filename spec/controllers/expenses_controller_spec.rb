require 'rails_helper'

RSpec.describe ExpensesController, type: :controller do
    describe 'show' do
    it 'should the expense count' do
        get :index
        expect(response).to have_http_status(200)
    end
    end

end