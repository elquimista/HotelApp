require 'rails_helper'

RSpec.describe RoomType, type: :model do
  subject { build(:room_type) }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a name" do
    subject.name = ''

    expect(subject).to be_invalid
    expect(subject.errors.messages).to have_key(:name)
  end

  it "is not valid with duplicate name within hotel scope" do
    room_type = create(:room_type)
    subject.hotel = room_type.hotel
    subject.name = room_type.name

    expect(subject).to be_invalid
    expect(subject.errors.messages).to have_key(:name)
  end

  it "is valid to have duplicate name across different hotels" do
    room_type = create(:room_type)
    subject.hotel = create(:hotel)
    subject.name = room_type.name

    expect(subject).to be_valid
  end
end
