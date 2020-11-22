class Shout < ApplicationRecord
    has_many :likes
    has_many :comments
    belongs_to :user
end
