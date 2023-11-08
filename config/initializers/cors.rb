Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do 
        origins "http://localhost:3001" #http://127.0.0.1:3000/
        resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end

    # allow do 
    #     origins "*" #serve URL
    #     resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head],
    #     credentials: true
    # end
end