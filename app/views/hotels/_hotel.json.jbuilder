json.extract! hotel, :id, :name, :location, :created_at, :updated_at, :room_types
json.url hotel_url(hotel, format: :json)
