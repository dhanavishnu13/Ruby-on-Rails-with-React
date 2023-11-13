class Expense < ApplicationRecord
    belongs_to :user
    # Validations for the attributes
    validates :payee_name, presence: true, length: { maximum: 255 }
    validates :categories_id, presence: true, length: { maximum: 255 }
    validates :description, presence: true, length: { maximum: 255 }
    validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 } 

    def validate_name
    end
end
