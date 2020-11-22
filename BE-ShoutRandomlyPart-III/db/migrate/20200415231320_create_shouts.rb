class CreateShouts < ActiveRecord::Migration[6.0]
  def change
    create_table :shouts do |t|
        t.references :user, null: false, foreign_key: true
        t.string :body
        t.integer :likeCount, :default => 0
        t.integer :commentCount, :default => 0
      t.timestamps
    end
  end
end
