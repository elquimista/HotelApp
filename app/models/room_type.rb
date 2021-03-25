class RoomType < ApplicationRecord
  belongs_to :hotel

  scope :available, -> { where(available: true) }
  scope :unavailable, -> { where(available: false) }

  validates :name, presence: true, uniqueness: { scope: :hotel }
end
