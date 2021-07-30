class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :last_name
      t.string :profile_img
      t.string :password_digest
      t.timestamps
    end
  end
end
