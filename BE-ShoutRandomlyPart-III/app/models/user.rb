class User < ApplicationRecord
    has_secure_password
    validates_presence_of :username
    validates :username, uniqueness: {case_sensitive: false}
    validates(:bio, { :length => { :maximum => 100 } })
    has_one_attached :image
    has_many :shouts
    has_many :relationships
    has_many :comments
    
    
    has_many :relationships, foreign_key: 'follower_id', dependent: :destroy
    

    has_many :active_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy

    has_many :passive_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy

    has_many :followed_users, through: :active_relationships, source: :followed_user
    
    has_many :follower_users, through: :passive_relationships, source: :follower_user
    
    has_many :followed_shouts, through: :followed_users, source: :shouts
end
