# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Shout.destroy_all
# Relationship.destroy_all
# User.destroy_all


# keenan = User.create!(username: 'KeenanJ', password: '555', first_name: 'Keenan', last_name: 'Jones', bio: 'Chicago born and raised')

# kelly = User.create!(username: 'KellyP', password: '555', first_name: 'Kelly', last_name: 'Phils', bio: 'Grew up in South Dakota')

# michael = User.create!(username: 'MichaelT', password: '555', first_name: 'Michael', last_name: 'Tenz', bio: 'From Texas')

# kelly_keenan = Relationship.create!(
#     follower_id: kelly.id, followed_id: keenan.id
# )

# keenan_michael = Relationship.create!(
#     follower_id: keenan.id, followed_id: michael.id
# )

# michael_kelly = Relationship.create!(
#     follower_id: michael.id, followed_id: kelly.id
# )


# keenan_shout = Shout.create!(
#     user_id: keenan.id, body: "Keenan's Shout!"
# )

# kelly_shout = Shout.create!(
#     user_id: kelly.id, body: "Kelly's Shout"
# )

# michael_shout = Shout.create!(
#     user_id: michael.id, body: "Michael's Shout"
# )

# keenan_comment = Comment.create!(
#     user_id: keenan.id, shout_id:michael_shout.id, body: 'Great Shout'
# )


# Shout
# t.integer "user_id", null: false
# t.string "body"
# t.integer "likeCount"
# t.integer "commentCount"

# Relationship
# t.integer "follower_id"
# t.integer "followed_id"

# User
# t.string "username"
# t.string "password_digest"
# t.string "first_name"
# t.string "last_name"
# t.string "imgUrl", default: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Default-welcomer.png/643px-Default-welcomer.png"
# t.string "bio"