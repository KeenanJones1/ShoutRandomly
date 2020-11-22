class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username 
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :imgUrl, :default => "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Default-welcomer.png/643px-Default-welcomer.png"
      t.string :bio
      t.timestamps
    end
  end
end
