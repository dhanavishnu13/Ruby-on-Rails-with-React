require 'rails_helper'

RSpec.describe Expense, type: :model do

  # Test that the expense model has the expected associations and validations
  it { should belong_to(:user) }
  it { should validate_presence_of(:payee_name) }
  it { should validate_presence_of(:amount) }
  it { should validate_presence_of(:due_date) }

  
end