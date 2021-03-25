FactoryBot.define do
  factory :room_type do
    hotel
    name { 'Single king non-smoking' }
    available { true }
  end
end