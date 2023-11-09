class CategoriesController < ApplicationController
    def index
        @categories=Category.all
    end

    # POST /expenses or /expenses.json
    def create
      @category = Category.new(expense_params)
  
      respond_to do |format|
        if @category.save
          format.html { redirect_to category_url(@category), notice: "Expense was successfully created." }
          format.json { render :show, status: :created, location: @category }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @category.errors, status: :unprocessable_entity }
        end
      end
    end


    private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def expense_params
      params.require(:category).permit(:id, :name)
    end
end
