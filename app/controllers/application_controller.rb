class ApplicationController < ActionController::API
  include ActionController::Cookies

  wrap_parameters format: []

  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  before_action :authorized 

  private
  
  def render_record_not_found (error)
    render json: {errors: {error.model => "Not Found"}}, status: :not_found
  end
  
  def render_invalid(invalid)
    render json: {errors: ErrorMessageSerializer.error_message(invalid.record.errors)}, status: :unprocessable_entity
  end

  def authorized
    return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :recruiter_id
  end

  
end
